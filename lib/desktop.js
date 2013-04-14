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

app.on('socket', function(planet){

	var args = [];

	args.push('-url', '"' + o.desktop.url + '"');

	spawn(o.dirname + o.callback, args)
	.on('close', function(){
		console.log('callback close');
	})
	.on('error', function(){
		console.log('error callback');
	})
	.on('exit', function(e){

		app.emit('exit');
		process.exit();

	}).stderr.on('data', function(buffer){
		console.log(buffer.toString());
	});

});
