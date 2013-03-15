var app = require('./app');

app.on('server connect', function(server){

	app.emit('server add static', '/public/lite');

	app.emit('server add favicon', '/public/lite/favicon.ico');

});
