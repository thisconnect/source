var connect = require('connect');

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

app.config.server.origin = o.server.protocol
	+ '://'
	+ o.server.host
	+ (!!o.server.port ? ':' + o.server.port : '');


app.on('setup', function(){

	var server = connect();

	app.on('server add static', function(path, target){
		if (!target) server.use(connect.static(o.dirname + path));
		else server.use(path, connect.static(o.dirname + target));
	});

	app.on('server add favicon', function(path){
		server.use(connect.favicon(o.dirname + path));
	});

	app.emit('server setup');
	app.emit('server connect', server);
	app.emit('server listen',
		server.listen(o.server.port, o.server.host)
	);

});
