var app = require('./app');
var options = require('./option');

var io = require('socket.io-client')

app.emit('option set', {
	'connection': {
		'host': '127.0.0.1'
		, 'port': 8004
		, 'io': {
			'force new connection': true
			, 'resource': 'io'
		}
	}
});

var o = options.connection;

var client = io.connect(o.host + ':' + o.port, o.io)
	.on('error', function(error){
		console.log('connection error:', error);
	})
	.on('disconnect', function(){
		console.log('disconncected!');
	});

app.emit('planet', client);
