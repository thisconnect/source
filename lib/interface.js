var app = require('./app'),
	option = require('./option');

app.emit('option set', {
	'interface': 'lite'
});

app.on('server connect', function(server){

	app.emit('server add static', 'public/' + option.interface);
	app.emit('server add favicon', 'public/' + option.interface + '/favicon.ico');

});
