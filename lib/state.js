var app = require('./app');

app.on('local type socket', function(socket){
	socket.get(function(type){
		if (!Object.keys(type).length) socket.merge(app.config.type);
		app.emit('type ready', socket);
	});
});

app.on('local socket', function(socket){
	socket.get(function(state){
		if (!Object.keys(state).length) socket.merge(app.config.state);
		app.emit('state ready', socket);
	});
});
