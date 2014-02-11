var Event = require('events').EventEmitter,
	config = require('./config');


var app = module.exports = new Event();

app.config = config.options;

app.setMaxListeners(20);

config.set({
	'dirname': __dirname.replace(/lib$/, '')
	, 'env': (!!process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
});

// ctrl-c
process.on('SIGINT', function(){
	app.emit('exit');
	process.exit();
});

// killall node
process.on('SIGTERM', function(){
	app.emit('exit');
	process.exit();
});

// on error
process.on('uncaughtException', function(error){
	console.log('ERROR', error);
	app.emit('exit');
});
