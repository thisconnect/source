var app = require('./app'),
	config = require('./config');

config.set({
	'engine': {
		'type': 'enum'
		, 'values': ['none', 'pd', 'sc', 'h5']
		, 'label': 'Engine'
	}
});

config.toArray(['engine', 'values']);

app.on('local type socket', function(type){
	type.set('engine', app.config.engine);
});

app.on('local socket', function(local){
	
	local.get('engine', function(engine){
		if (!engine) local.set('engine', 'none');
	});
	
	local.on('set', function(key, value){
		if (key != 'engine') return;
		// console.log(key, value);
	});
	
});
