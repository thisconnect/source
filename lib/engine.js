var app = require('./app'),
	config = require('./config');


config.set({
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
});

config.toArray(['type', 'engine', 'env', 'values']);

config.set({
	'state': { 'engine': { 'env': 'pd' }},
	'type': { 'engine': app.config.engine.type }
});

app.config.engine.env.forEach(function(a, env){
	require(app.config.dirname + 'lib/' + app.config.engine.env[env]);
});

function onSet(path, value){
	if (path[0] != 'engine') return;
	if (path[1] == 'env') app.emit(value + ' init');
}

app.on('sockets ready done', function(){
	onSet(['engine', 'env'], app.config.state.engine.env);
});

app.on('state ready', function(socket){

	socket.on('set', onSet);

	socket.on('remove', function(key){
		if (key == 'engine'){
			socket.set('engine', app.config.engine.state);
		}
	});

});
