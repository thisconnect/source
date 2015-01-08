'use strict';

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
		, 'log level': (config.options.env == 'development' ? 2 : 1)
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': (config.options.env == 'production')
		, 'browser client minification': (config.options.env == 'production')
		, 'browser client gzip': true
	}
});

config.dashToSpace(['socket']);


app.on('server listen', function(server){

	var socket = io.listen(server, config.options.socket);

	new planet(socket.of('/schema'), config.options.local)
		.on('listening', function(/*host, port*/){
			app.emit('local schema', this);
		});

	new planet(socket, config.options.local)
		.on('listening', function(/*host, port*/){
			app.emit('local state', this);
		});

});
