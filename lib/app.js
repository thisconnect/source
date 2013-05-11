var emitter = require('events').EventEmitter,
	has = Object.prototype.hasOwnProperty;

var app = module.exports = new emitter();

app.setMaxListeners(20);

var actions = {};

app.get = function(serivce){
	if (has.call(actions, serivce)) return actions[serivce];
	actions[serivce] = new emitter();
};

app.env = (!!process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';

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

app.on('option setup', function(){
	app.emit('option set', {
		'dirname': __dirname.replace(/lib$/, '')
	});
});
