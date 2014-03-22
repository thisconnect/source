var app = require('./app'),
	config = require('./config');


config.set({
	'engine': {
		'pd': 'pd'
	}
	, 'type': {
		'engine': {
			'env': {
				'type': 'enum'
				, 'values': ['none', 'pd', 'sc', 'h5']
				, 'label': 'Environment'
			}
		}
	}
	, 'state': {
		'engine': {
			'env': 'none'
		}
	}
});

config.toArray(['type', 'engine', 'env', 'values']);

for (var lib in app.config.engine){
	require(app.config.dirname + 'lib/' + app.config.engine[lib]);
}

app.on('state ready', function(socket){

	socket.on('set', function(path, value){
		if (path[0] != 'engine') return;

		if (path[1] == 'env' && value == 'pd') app.emit(value + ' init');

	});

	socket.on('merge', function(data){
		console.log('LOCAL STATE SOCKET MERGE!!!!!', data);
	});

});
