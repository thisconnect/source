'use strict';

var io = require('socket.io-client');

var app = require('./app'),
	config = require('./config'),
	o = config.options;

config.set({
	'client': {
		'host': '127.0.0.1'
		, 'port': 8004
		, 'io': {
			'force new connection': true
			, 'resource': 'io'
		}
	}
});

var client = io.connect(o.client.host + ':' + o.client.port, o.client.io);

client.on('error', function(error){
	console.log('connection error:', error);
});

client.on('connect', function(socket){
	console.log('client connected');
	app.emit('client connected', socket);
});

client.on('disconnect', function(){
	console.log('client disconnected');
	app.emit('client disconnected');
});

app.on('app setup', function(){
	app.emit('client connection', client);
});
