var app = require('./app');

var listeners = [];

app.on('newListener', function(name){

	if (listeners.indexOf(name) != -1) return;

	listeners.push(name);

	console.log('register:', name);

	app.on(name, function(){
		console.log('app:', name);
	});

});
