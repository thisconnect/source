var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'log': {
		'level': 0
	}
});

var listeners = [];

app.on('newListener', function(name){

	if (listeners.indexOf(name) != -1) return;

	listeners.push(name);

	console.log('register:', name);

	app.on(name, function(){
		console.log('app:', name);
	});

});
