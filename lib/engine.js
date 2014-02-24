var app = require('./app'),
	config = require('./config');

config.set({
	'engine': {
		'env': {
			'type': 'enum'
			, 'values': ['none', 'pd', 'sc', 'h5']
			, 'label': 'Environment'
		}
	},
	'state': {
		'engine': {
			'env': 'none'
		}
	}
});

config.toArray(['engine', 'env', 'values']);

app.on('local socket', function(socket){

	socket.on('set', function(path, value){
		if (path[0] != 'engine') return;
		console.log('LOCAL SOCKET', path, value);
	});

	socket.on('merge', function(data){
		console.log('LOCAL SOCKET', data);
	});

});
