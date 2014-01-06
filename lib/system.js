var planet = require('planet');

var app = require('./app'),
	option = require('./option');


app.emit('option set', {
	'system': {
	}
});


app.on('socket', function(socket){

	var system = new planet(socket.of('/system')),
		state  = new planet(socket.of('/state'));

	system.on('listening', function(){
		app.emit('system socket', system);
	});

	state.on('listening', function(){
		app.emit('state socket', state);
	});

});
