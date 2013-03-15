var app = require('./app');

app.on('server listen', function(server){

	var io = require('socket.io');

	app.emit('socket', io.listen(server, app.options.io));

});

app.on('socket', function(socket){

	var planet = require('planet');

	app.emit('planet', new planet(socket));

	app.emit('service', new planet(socket.of('/service')));

	app.emit('state', new planet(socket.of('/state')));

});
