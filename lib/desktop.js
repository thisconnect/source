var app = require('./app'),
	option = require('./option');

app.emit('option set', {
	'desktop': {
		'url': 'http://localhost:8004'
	}
	, 'callback': false // '/../../MacOS/callback-mac'
});

if (!option.callback) return;

app.on('planet', function(planet){
	var args = [];

	args.push('-url', '"' + option.desktop.url + '"');

	require('child_process')
	.spawn(option.dirname + option.callback, args)
	.on('exit', function(e){

		app.emit('exit');
		process.exit();

	}).stderr.on('data', function(buffer){
		// console.log(buffer.toString());
	});

});
