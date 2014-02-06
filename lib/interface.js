var app = require('./app'),
	config = require('./config'),
	o = config.options;


config.set({
	'interface': 'lite'
});

app.on('server connect', function(server){

	app.emit('server add static', 'public/' + o.interface);
	app.emit('server add favicon', 'public/' + o.interface + '/favicon.ico');

});
