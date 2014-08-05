var spawn = require('child_process').spawn;

var app = require('./app'),
	config = require('./config'),
	o = config.options;


config.set({
	'desktop': {
		'callback': false
		, 'chrome': false
		, 'firefox': false
		, 'darwin': {
			'callback': '../../MacOS/callback-mac'
			, 'chrome': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
			, 'firefox': '/Applications/Firefox.app/Contents/MacOS/firefox'
		}
	}
});


if (o.desktop.chrome){
	app.on('server listen', function(){

		var exec = o.desktop[process.platform].chrome,
			args = [];

		args.push('--app=' + o.server.origin);

		app.emit('desktop setup', spawn(exec, args));

	});
}


if (o.desktop.callback){
	app.on('server listen', function(){

		var exec = o.dirname + o.desktop[process.platform].callback,
			args = [];

		args.push('-url', '"' + o.server.origin + '"');

		app.emit('desktop setup', spawn(exec, args));

	});
}


if (o.desktop.firefox){
	app.on('server listen', function(){

		var exec = o.desktop[process.platform].firefox,
			args = [];

		args.push('-new-window', o.server.origin);

		app.emit('desktop setup', spawn(exec, args));

	});
}


if (o.desktop.callback || o.desktop.chrome || o.desktop.firefox){
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
}
