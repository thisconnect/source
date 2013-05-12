var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'log': {
		'level': (app.env == 'production') ? 0 : 1
	}
});

var listeners = [];

app.on('newListener', function(name){
	if (listeners.indexOf(name) != -1) return;
	listeners.push(name);
	if (o.log.level) console.log('register:', name);
	app.on(name, function(){
		if (o.log.level) console.log('app:', name);
	});
});

if (!o.log.level) return;

app.on('log', function(fn){
	fn(console.log);
});
