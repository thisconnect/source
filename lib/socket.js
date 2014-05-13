var io = require('socket.io'),
	planet = require('planet');

var app = require('./app'),
	config = require('./config');


config.set({
	'local': {
		'limit': 32
	}
	, 'socket': {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': (app.config.env == 'development' ? 2 : 1)
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': (app.config.env == 'production')
		, 'browser client minification': (app.config.env == 'production')
		, 'browser client gzip': (app.config.env == 'production')
	}
	, 'type': {}
	, 'state': {}
});

config.toArray(['socket', 'transports']);

config.dashToSpace(['socket']);


app.on('server listen', function(server){
	var socket = io.listen(server, app.config.socket);

	var sockets = {
		type: null,
		state: null
	};

	function then(){
		if (!sockets.type || !sockets.state) return;
		app.emit('sockets ready', sockets.state, sockets.type);
	}

	var type = new planet(socket.of('/type'), app.config.local);

	type.on('listening', function(host, port){
		type.get(function(values){
			if (!Object.keys(values).length) type.merge(app.config.type);
			sockets.type = type;
			then();
		});
	});

	var state = new planet(socket, app.config.local);

	state.on('listening', function(host, port){
		state.get(function(values){
			if (!Object.keys(values).length) state.merge(app.config.state);
			sockets.state = state;
			then();
		});
	});

});
