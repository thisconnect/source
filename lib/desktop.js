var app = require('./app'),
	option = require('./option');

if (process.platform == 'darwin') app.emit('option set', {
	'callback': '/../../MacOS/callback-mac'
});

app.emit('option set', {
	'desktop': {
		'url': 'http://localhost:8004'
	}
});

app.on('planet', function(planet){
	var args = [],
		desktop = option.desktop;

	if (!!desktop.url) args.push('-url', '"' + desktop.url + '"');

	require('child_process')
		.spawn(option.dirname + option.callback, args)
		.on('exit', function(e){

			app.emit('exit');
			process.exit();

		}).stderr.on('data', function(buffer){

	//		console.log(buffer.toString());

		});

});
