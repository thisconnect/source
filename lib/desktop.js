var spawn = require('child_process').spawn;

var app = require('./app'),
	o = require('./option');


app.emit('option set', {
	'desktop': {
		'url': 'http://localhost:8004'
	}
	, 'callback': false // '../../MacOS/callback-mac'
});

if (!o.callback) return;

app.on('socket', function(socket){
	var args = [];
	args.push('-url', '"' + o.desktop.url + '"');
	app.emit('desktop setup', spawn(o.dirname + o.callback, args));
});

app.on('desktop setup', function(desktop){

	desktop.on('close', function(){
		console.log('callback close');
	});

	desktop.on('error', function(){
		console.log('error callback');
	});

	desktop.on('exit', function(e){
		app.emit('exit');
		process.exit();
	});

	app.on('exit', function(){
		desktop.kill();
	});

	app.emit('log', function(log){
		desktop.stderr.on('data', function(buffer){
			log('desktop stderr', buffer.toString());
		});
	});

});
