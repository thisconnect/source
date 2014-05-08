var app = require('./app'),
	config = require('./config');


config.set({
	'engine': {
		'env': 'pd'
		, 'modules': ['pd']
	}
	, 'type': {
		'engine': {
			'env': {
				'label': 'Environment'
				, 'type': 'enum'
				, 'values': ['none', 'pd', 'sc', 'h5']
			}
		}
	}
});

config.toArray(['engine', 'modules']);
config.toArray(['type', 'engine', 'env', 'values']);

app.config.engine.modules.forEach(function(env, i){
	require(app.config.dirname + 'lib/engine.' + env);
});

app.on('sockets ready', function(state, type){

	//app.state.on('change(engine env)', function(value){});

	state.on('set', function(path, value){
		if (path[0] == 'engine' && path[1] == 'env'){
			if (value == 'none') state.remove('engine');
			else app.emit('engine ' + value + ' init');
		}
	});

	// test state.emit('get', ....
	state.get(['engine', 'env'], function(env){
		if (!env) state.set(['engine', 'env'], app.config.engine.env);
		else if (env != 'none') app.emit('engine ' + env + ' init');
	});

	state.on('remove', function(key){
		if (key == 'engine'){
			state.set('engine', {'env': 'none'});
		}
	});

});
