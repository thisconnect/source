var app = require('./app');
	
app.on('planet', function(planet){

	if (!app.hasOption('--gui') || process.platform != 'darwin') return;

	require('child_process')
		.spawn(app.options.dirname + '/../../MacOS/callback-mac', [
			'-url', '"http://localhost:8004"'
		]).on('exit', function(){

			app.emit('exit');
			process.exit();

		}).stderr.on('data', function(buffer){

	//		console.log(buffer.toString());

		});

});
