var io = require('socket.io');

var app = require('./app'),
	config = require('./config');


config.set({
	'socket': {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': (app.config.env == 'development' ? 2 : 1)
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': (app.config.env == 'production')
		, 'browser client minification': (app.config.env == 'production')
		, 'browser client gzip': (app.config.env == 'production')
	}
});

config.toArray(['socket', 'transports']);

config.dashToSpace(['socket']);

app.on('server listen', function(server){
	app.emit('socket', io.listen(server, app.config.socket));
});
