var app = require('./app'),
	config = require('./config');


config.set({
	'interface': 'lite'
});

app.on('server connect', function(server){

	var path = 'public/' + app.config.interface;

	app.emit('server add static', path);
	app.emit('server add favicon', path + '/favicon.ico');

});
