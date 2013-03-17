var app = require('./app'),
	option = require('./option');

app.emit('option set', 'server', {
	'host': 'localhost'
	, 'port': 8004
});

app.on('setup', function(){

	var connect = require('connect'),
		server = connect();

	app.on('server add static', function(path, target){
		if (!target) server.use(connect.static(option.dirname + path));
		else server.use(path, connect.static(option.dirname + target));
	});

	app.on('server add favicon', function(path){
		server.use(connect.favicon(option.dirname + path));
	});

	app.emit('server setup');

	app.emit('server connect', server);

	app.emit('server listen',
		server.listen(option.server.port, option.server.host)
	);

});
