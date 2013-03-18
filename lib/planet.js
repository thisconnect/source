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

app.emit('argv modify', {
	'io': function(obj, argv){
		for (var p in argv){

			// splits list into array
			if (typeof argv[p] == 'string'
				&& argv[p].indexOf(',') != -1
			) argv[p] = argv[p].split(',');

			// makes sure transports is always an array
			if (p == 'transports' 
				&& typeof argv[p] == 'string'
			) argv[p] = [argv[p]];

			// converts dash to space
			if (/-/.test(p)){
				obj[p.replace(/-/g, ' ')] = argv[p];
				delete obj[p];
				continue;
			}
			obj[p] = argv[p];
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
