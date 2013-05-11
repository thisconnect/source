var io = require('socket.io'),
	planet = require('planet');

var app = require('./app'),
	option = require('./option');

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

app.on('option ready', function(o){

	// turn transports into array
	if (typeof o.io.transports == 'string'){
		o.io.transports = o.io.transports.split(',');
	}

	// convert dashes into spaces
	for (var p in o.io){
		if (!/-/.test(p)) continue;
		o.io[p.replace(/-/g, ' ')] = o.io[p];
		delete o.io[p];
	}
});

app.on('server listen', function(server){
	app.emit('socket io', io.listen(server, option.io));
});

app.on('socket io', function(socket){
	app.emit('socket', new planet(socket));
	app.emit('system socket', new planet(socket.of('/system')));
	app.emit('state socket', new planet(socket.of('/state')));
});
