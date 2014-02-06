var io = require('socket.io');

var app = require('./app'),
	config = require('./config');


config.set({
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

config.toArray(['io', 'transports']);

config.dashToSpace(['io']);

app.on('server listen', function(server){
	app.emit('socket', io.listen(server, app.config.io));
});
