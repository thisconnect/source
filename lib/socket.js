var io = require('socket.io');

var app = require('./app'),
	config = require('./config');


config.set({
	'socket': {
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

config.toArray(['socket', 'transports']);

config.dashToSpace(['socket']);

app.on('server listen', function(server){
	app.emit('socket', io.listen(server, app.config.socket));
});
