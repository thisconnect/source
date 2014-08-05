var app = require('./app'),
	config = require('./config');


config.set({
	'engine': {
		'env': 'pd'
		, 'modules': ['pd']
	}
	, 'schema': {
		'engine': {
			'type': 'object'
			, 'properties': {
				'env': {
					'title': 'Environment'
					, 'type': 'enum'
					, 'values': ['none', 'pd', 'sc', 'h5']
				}
			}
		}
	}
});


app.config.engine.modules.forEach(function(env/*, i*/){
	require(app.config.dirname + 'lib/engine.' + env);
});

app.state.on('remove(engine)', function(socket){
	socket.set('engine', {'env': 'none'});
});

app.state.on('change(engine env)', function(socket, value){

	if (value == 'none') socket.remove('engine');
	else app.emit('engine ' + value + ' init');

});

app.on('sockets ready', function(state/*, schema*/){

	// test state.emit('get', ....
	state.get(['engine', 'env'], function(env){
		if (!env) state.set(['engine', 'env'], app.config.engine.env);
		else if (env != 'none') app.emit('engine ' + env + ' init');
	});

});
