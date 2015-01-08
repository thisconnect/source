'use strict';

var app = require('./app'),
	state = require('./state'),
	config = require('./config');


config.set({
	'engine': {
		'modules': ['pd']
	}
	, 'state': {
		'engine': 'pd'
	}
	, 'schema': {
		'engine': {
			'title': 'Engine'
			, 'type': 'enum'
			, 'values': ['none', 'pd', 'sc', 'h5']
		}
	}
});


config.get(['engine', 'modules']).forEach(function(env){
	require(__dirname + '/engine.' + env);
});

state.on('remove(engine)', function(socket){
	socket.set('engine', {'env': 'none'});
});

state.on('change(engine env)', function(socket, value){
	app.emit('engine ' + value + ' init');
});
