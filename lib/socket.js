var io = require('socket.io'),
	planet = require('planet');

var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'io': {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': 1
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': false
		, 'browser client minification': false
		, 'browser client gzip': true
	}
});

app.on('option ready', function(options){
	if (typeof options.io.transports == 'string'){
		options.io.transports = options.io.transports.split(',');
	}
	for (var p in options.io){
		if (!/-/.test(p)) continue;
		options.io[p.replace(/-/g, ' ')] = options.io[p];
		delete options.io[p];
	}
});

app.on('server listen', function(server){
	app.emit('socket io', io.listen(server, o.io));
});

app.on('socket io', function(socket){
	app.emit('socket',			new planet(socket));
	app.emit('socket system',	new planet(socket.of('/system')));
	app.emit('socket state',	new planet(socket.of('/state')));
});
