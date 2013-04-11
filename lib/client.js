var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'client': {
		'host': '127.0.0.1'
		, 'port': 8004
		, 'io': {
			'force new connection': true
			, 'resource': 'io'
		}
	}
});

var io = require('socket.io-client')

var client = io.connect(o.client.host + ':' + o.client.port, o.client.io)
	.on('error', function(error){
		console.log('connection error:', error);
	})
	.on('connect', function(socket){
		console.log('client connected');
		app.emit('client connected', socket);
	})
	.on('disconnect', function(){
		console.log('client disconnected');
		app.emit('client disconnected');
	});

app.on('app setup', function(){
	app.emit('client connection', client);
});
