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

app.on('option ready', function(options){
	for (var p in options.io){
		if (/-/.test(p)){
			options.io[p.replace(/-/g, ' ')] = options.io[p];
			delete options.io[p];
		}
		
		if (typeof options.io.transports == 'string'){
			options.io.transports = options.io.transports.split(',');
		}
	}
});

app.on('server listen', function(server){
	var io = require('socket.io');
	app.emit('io', io.listen(server, option.io));
});

app.on('io', function(socket){
	var planet = require('planet');
	app.emit('planet',  new planet(socket));
	app.emit('service', new planet(socket.of('/service')));
	app.emit('state',   new planet(socket.of('/state')));
});
