var app = require('./app'),
	config = require('./config');


config.set({
	'engine': {
		'env': ['pd']
	}
	, 'type': {
		'engine': {
			'env': {
				'type': 'enum'
				, 'values': ['none', 'pd', 'sc', 'h5']
				, 'label': 'Environment'
			}
		}
	}
	, 'state': {
		'engine': {
			'env': 'pd'
		}
	}
});

config.toArray(['type', 'engine', 'env', 'values']);

app.config.engine.env.forEach(function(env, i){
	require(app.config.dirname + 'lib/' + env);
});

app.on('sockets ready', function(state, type){

	state.on('set', function(path, value){
		if (path[0] == 'engine'){
			if (path[1] == 'env') app.emit(value + ' init');
		}
	});

	// test state.emit('get', ....
	state.get(['engine', 'env'], function(env){
		if (env != 'none') app.emit(env + ' init');
	});

	state.on('remove', function(key){
		if (key == 'engine'){
			state.set('engine', {
				'env': 'none'
			});
		}
	});

});
