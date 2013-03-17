var app = require('./app'),
	option = require('./option');

app.emit('option set', 'ui', 'lite');

app.on('server connect', function(server){
	app.emit('server add static', '/public/' + option.ui);
	app.emit('server add favicon', '/public/' + option.ui + '/favicon.ico');
});
