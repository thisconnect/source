var connect = require('connect'),
	io      = require('socket.io'),
	planet  = require('planet');


var server = connect()
	.use('/instruments', connect.static(__dirname + '/../../blib'))
	.use(connect.static(__dirname))
	.use(connect.favicon('./favicon.ico'))
	.listen(8004, 'localhost');


var socket = io.listen(server, {
	'transports': ['websocket'],
	'flash policy server': false,
	'log level': 1//,
	//'browser client': false,
	//'browser client cache': true,
	//'browser client minification': true,
	//'browser client gzip': true
});


planet(socket);
