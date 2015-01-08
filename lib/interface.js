'use strict';

var app = require('./app'),
	config = require('./config');


config.set({
	'interface': 'public/lite'
});


app.on('server connect', function(/*server*/){

	app.emit('server add static', config.options.interface);
	app.emit('server add favicon', config.options.interface + '/favicon.ico');

});
