var app = require('./app'),
	option = require('./option');


app.emit('option set', {
	'engine': {
		'type': 'enum'
		, 'values': ['pd', 'sc']
		, 'label': 'Engine'
	}
});

app.on('option parse', function(o){
	app.emit('option to array', ['engine', 'values']);
});

app.on('system socket', function(system){
	system.set('engine', option.engine);
});
