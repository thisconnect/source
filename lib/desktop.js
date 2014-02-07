var spawn = require('child_process').spawn;

var app = require('./app'),
	config = require('./config')
	o = config.options;


config.set({
	'desktop': {
		'url': 'http://localhost:8004'
	}
	, 'callback': false // '../../MacOS/callback-mac'
});

if (!o.callback) return;

app.on('socket', function(socket){

	var exec = o.dirname + o.callback,
		args = [];

	args.push('-url', '"' + o.desktop.url + '"');
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
	*/

	app.emit('desktop pid', desktop.pid);

});
