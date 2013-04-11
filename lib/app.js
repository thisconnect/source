var Event = require('events').EventEmitter,
	has = Object.prototype.hasOwnProperty;

var app = module.exports = new Event();

app.setMaxListeners(20);

var actions = {};

module.exports.get = function(serivce){
	if (has.call(actions, serivce)) return actions[serivce];
	actions[serivce] = new Event();
};

// NODE_ENV=production node index.js
// console.log(process.env.NODE_ENV, process.env);

/*
process.on('exit', function(){
	app.emit('exit');
});

process.on('uncaughtException', function(){
	app.emit('exit');
});
*/

// listen to ctrl-c
process.on('SIGINT', function(){
	app.emit('exit');
	process.exit();
});

// listen to killall node
process.on('SIGTERM', function(){
	app.emit('exit');
	process.exit();
});

app.on('option setup', function(){
	app.emit('option set', {
		'dirname': __dirname + '/../'
	});
});
