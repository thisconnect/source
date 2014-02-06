var app = require('./app'),
	config = require('./config');


config.set({
	'log': {
		'level': (app.env == 'production') ? 0 : 1
	}
});

var listeners = [];

app.on('newListener', function(name){
	if (listeners.indexOf(name) != -1) return;
	listeners.push(name);
	if (app.config.log.level) console.log('register:', name);
	app.on(name, function(){
		if (app.config.log.level) console.log('app:', name);
	});
});

if (!app.config.log.level) return;

app.on('log', function(fn){
	fn(console.log);
});
