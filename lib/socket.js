var io = require('socket.io'),
	planet = require('planet');

var app = require('./app'),
	config = require('./config');


config.set({
	'local': {
		'limit': 32
	}
	, 'socket': {
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

app.on('socket', function(socket){

	var sockets = {
		type: null,
		state: null,
		add: function(kind, socket){
			this[kind] = socket;
			if (!this.type || !this.state) return;
			app.emit('sockets ready', this.state, this.type);
		}
	};

	new planet(socket.of('/type'), app.config.local)
		.on('listening', function(host, port){
			app.emit('local type socket', this);
			sockets.add('type', this);
		});

	new planet(socket, app.config.local)
		.on('listening', function(host, port){
			app.emit('local state socket', this);
			sockets.add('state', this);
		});

});
