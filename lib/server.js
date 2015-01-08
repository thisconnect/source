'use strict';

var connect = require('connect');
var serve = require('serve-static');
var favicon = require('serve-favicon');
// var compression = require('compression');

var app = require('./app'),
	config = require('./config'),
	o = config.options;

config.set({
	'server': {
		'host': 'localhost'
		, 'port': 8004
		, 'protocol': 'http'
	}
});

o.server.origin = o.server.protocol +
	'://' +
	o.server.host +
	(!!o.server.port ? ':' + o.server.port : '');


app.on('setup', function(){

	var server = connect();
	// server.use(compression())

	app.on('server add static', function(path){
		server.use(serve(o.dirname + path, {
			// 'etag': false,
			// 'maxAge': 7 * 24 * 60 * 60 * 1000
		}));
	});

	app.on('server add favicon', function(path){
		server.use(favicon(o.dirname + path));
	});

	app.emit('server setup');
	app.emit('server connect', server);
	app.emit('server listen', server.listen(o.server.port, o.server.host));

});
