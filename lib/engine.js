var app = require('./app'),
	config = require('./config');


var conf = {
	'engine': {
		'env': ['pd']
		, 'type': {
			'env': {
				'type': 'enum'
				, 'values': ['none', 'pd', 'sc', 'h5']
				, 'label': 'Environment'
			}
		}
		, 'state': {
			'env': 'none'
		}
	}
};

config.set(conf);

config.toArray(['type', 'engine', 'env', 'values']);

config.set({
	'state': { 'engine': app.config.engine.state }
	, 'type': { 'engine': app.config.engine.type }
});

app.config.engine.env.forEach(function(i, env){
	require(app.config.dirname + 'lib/' + app.config.engine.env[env]);
});

function onSet(path, value){
	if (path[0] != 'engine') return;
	if (path[1] == 'env') app.emit(value + ' init');
}

app.on('sockets ready done', function(){
	onSet(['engine', 'env'], app.config.state.engine.env);
});

app.on('sockets ready', function(state, type){

	state.on('set', onSet);

	state.on('remove', function(key){
		if (key == 'engine'){

			type.set('engine', JSON.parse(JSON.stringify(conf.engine.type)));
			state.set('engine', JSON.parse(JSON.stringify(conf.engine.state)));
			
			console.log('conf.engine.state', conf.engine.state);
			console.log('app.config.state.engine', app.config.state.engine);
			
			console.log('conf.engine.type', conf.engine.type);
			console.log('app.config.type.engine', app.config.type.engine);
		}
	});

});
