var app = require('./app');

app.on('server connect', function(server){

	app.emit('server add static', '/public/satellite');

	app.emit('server add favicon', '/public/satellite/favicon.ico');

});
