var emitter = require('events').EventEmitter;

var app = module.exports = new emitter();

app.setMaxListeners(20);

app.env = (!!process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

app.on('option setup', function(){
	app.emit('option set', {
		'dirname': __dirname.replace(/lib$/, '')
	});
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
