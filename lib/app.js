var Event = require('events').EventEmitter,
	config = require('./config');


config.set({
	'dirname': __dirname.replace(/lib$/, '')
	, 'env': (!!process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
});


var app = module.exports = new Event();
app.setMaxListeners(20);

app.state = new Event();
app.state.setMaxListeners(20);

app.schema = new Event();
app.schema.setMaxListeners(20);

app.config = config.options;

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
