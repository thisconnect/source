var app = require('./app');

app.state = app.config.state;

app.on('local type socket', function(socket){

	socket.get(function(type){
		delete app.config.state;
		if (!Object.keys(type).length) socket.merge(app.config);
	});

});

app.on('local socket', function(socket){

	socket.get(function(state){
		if (!Object.keys(state).length) socket.merge(app.state);
		app.emit('state ready');
	});

});
