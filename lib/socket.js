var io = require('socket.io');

var app = require('./app'),
	option = require('./option');


app.emit('option set', {
	'io': {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': 1 // TODO env
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': false
		, 'browser client minification': false
		, 'browser client gzip': false
	}
});

app.on('option parse', function(o){
	app.emit('option to array', ['io', 'transports']);
	app.emit('option dash to space', ['io']);
});

app.on('server listen', function(server){
	app.emit('socket', io.listen(server, option.io));
});

app.on('socket', function(socket){
	// app.emit('socket', new planet(socket));
});
