var spawn = require('child_process').spawn;

var app = require('./app'),
	config = require('./config'),
	o = config.options;


config.set({
	'desktop': {
		'callback': false
		, 'chrome': false
		, 'macos': {
			'callback': '../../MacOS/callback-mac'
			, 'chrome': '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
		}
	}
});

if (!o.desktop.callback && !o.desktop.chrome) return;

app.on('socket', function(socket){

	var exec, args = [];

	if (o.desktop.callback){
		exec = o.dirname + o.desktop.macos.callback;
		args.push('-url', '"' + o.server.origin + '"');
	}

	if (o.desktop.chrome){
		exec = o.desktop.macos.chrome;
		args.push('--app=' + o.server.origin);
	}

	app.emit('desktop setup', spawn(exec, args));
});

app.on('desktop setup', function(desktop){

	desktop.on('close', function(code, signal){
		console.log('desktop close', code, signal);
	});

	desktop.on('error', function(error){
		console.log('desktop error', error);
	});

	desktop.on('exit', function(code, signal){
		app.emit('exit');
		process.exit();
		console.log('desktop exit', code, signal);
	});

	app.on('exit', function(){
		desktop.kill();
	});

	app.emit('log', function(log){
		desktop.stderr.on('data', function(buffer){
			log('desktop stderr', buffer.toString());
		});
	});

	/*
	app.on('desktop pid', function(pid){
		console.log('desktop pid', pid);
	});

	app.emit('desktop pid', desktop.pid);
	*/

});
