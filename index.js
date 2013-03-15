var app = require('./lib/app');

app.options = {
	'dirname': __dirname,
	'server': {
		'host': 'localhost'
		, 'port': 8004
	}
	, 'io' : {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': 1
		, 'resource': '/io'
		//, 'browser client': false
		//, 'browser client cache': true
		//, 'browser client minification': true
		//, 'browser client gzip': true
	}
	, 'pd': {
		'read': 8005
		, 'write': 8006
		, 'flags': [
			'-noprefs'
		//	, '-nogui'
			, '-stderr'
			, '-path'
			, './pd'
			, '-path'
			, './pd/blib'
			, '-open'
			, './pd/manager.pd'
		]
	}
};

require('./lib/monitor');
require('./lib/ui');
require('./lib/desktop');
require('./lib/planet');
require('./lib/pd');
require('./lib/server');

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

app.emit('setup');
