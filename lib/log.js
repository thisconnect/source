'use strict';

var app = require('./app');
var config = require('./config');

var listeners = [];

if (config.options.env == 'production') return;

app.on('newListener', function(name){

	if (listeners.indexOf(name) != -1) return;
	listeners.push(name);
	// console.log('register:', name);

	app.on(name, function(){
		console.log('app:', name);
	});

});

app.on('log', function(fn){
	fn(console.log);
});

app.on('setup', function(){
	// console.log(app.config);
});
