var spawn = require('child_process').spawn;

var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'desktop': {
		'url': 'http://localhost:8004'
	}
	, 'callback': '../../MacOS/callback-mac'
});

if (!o.callback) return;

var args = [];
args.push('-url', '"' + o.desktop.url + '"');

app.on('socket', function(planet){

	var child = spawn(o.dirname + o.callback, args)
	.on('close', function(){
		console.log('callback close');
	})
	.on('error', function(){
		console.log('error callback');
	})
	.on('exit', function(e){
		app.emit('exit');
		process.exit();
	});

	child.stderr.on('data', function(buffer){
		console.log(buffer.toString());
	});
	
	app.on('exit', function(){
		child.kill();
	});

});
