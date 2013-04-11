var app = require('./app');
var option = require('./option');

var io = require('socket.io-client')

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

var o = option.client;

var client = io.connect(o.host + ':' + o.port, o.io)
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
