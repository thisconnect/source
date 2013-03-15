var app = require('./app');

app.on('server connect', function(server){

	app.emit('server add static', '/public/' + app.options.ui);

	app.emit('server add favicon', '/public/' + app.options.ui + '/favicon.ico');

});
