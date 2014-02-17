var app = require('./app'),
	config = require('./config');

config.set({
	'engine': {
		'environment': {
			'type': 'enum'
			, 'values': ['none', 'pd', 'sc', 'h5']
			, 'label': 'Environment'
		}
	}
});

config.toArray(['engine', 'values']);

app.on('local type socket', function(type){
	type.set('engine', app.config.engine);
});

app.on('local socket', function(local){
	
	local.get('engine', function(engine){
		if (!!engine) return;
		local.set(['engine', 'environment'], 'none');
	});
	
	local.on('set', function(path, value){
		console.log(path);
		if (path[0] != 'engine') return;
		console.log('LOCAL SOCKET', path, value);
	});
	
	local.on('merge', function(data){
		console.log('LOCAL SOCKET', data);
	});
	
});
