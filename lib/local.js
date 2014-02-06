var planet = require('planet');;

var app = require('./app'),
	config = require('./config');


config.set({
	'local': {
		'limit': 32
	}
});

app.on('socket', function(socket){

	var local = new planet(socket, app.config.local),
		type  = new planet(socket.of('/type'), app.config.local);

	state.on('listening', function(){
		app.emit('local socket', state);
	});

	type.on('listening', function(){
		app.emit('local type socket', type);
	});

});
