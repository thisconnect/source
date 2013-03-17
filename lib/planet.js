var app = require('./app'),
	option = require('./option');

app.emit('option parse', 'io', function(option){
	var o = {};
	for (var p in option){
		o[p.replace(/-/g, ' ')] = option[p];
	}
	return o;
});

app.emit('option set', 'io', {
	'transports': ['websocket']
	, 'flash policy server': false
	, 'log level': 1
	, 'resource': '/io'
	, 'browser client': false
	, 'browser client cache': true
	, 'browser client minification': true
	, 'browser client gzip': true
});

app.on('server listen', function(server){
	var io = require('socket.io');
	app.emit('socket', io.listen(server, option.io));
});

app.on('socket', function(socket){
	var planet = require('planet');
	app.emit('planet',  new planet(socket));
	app.emit('service', new planet(socket.of('/service')));
	app.emit('state',   new planet(socket.of('/state')));
});
