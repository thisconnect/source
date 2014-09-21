var io = require('socket.io'),
	planet = require('planet');

var app = require('./app'),
	config = require('./config');


config.set({
	'local': {
		'limit': 32
	}
	, 'socket': {
		'transports': ['websocket']
		, 'flash policy server': false
		, 'log level': (app.config.env == 'development' ? 2 : 1)
		, 'resource': '/io'
		, 'browser client': true
		, 'browser client cache': (app.config.env == 'production')
		, 'browser client minification': (app.config.env == 'production')
		, 'browser client gzip': true
	}
	, 'schema': {}
	, 'state': {}
});

config.dashToSpace(['socket']);

app.on('sockets ready', function(state/*, schema*/){

	state.on('remove', function(key){
		if (typeof key != 'string') key = key.join(' ');
		app.state.emit('remove(' + key + ')', state);
	});

	state.on('set', function(path, value){
		if (typeof path != 'string') path = path.join(' ');
		app.state.emit('change(' + path + ')', state, value);
	});

});

app.on('server listen', function(server){

	var socket = io.listen(server, app.config.socket),
		state, schema;

	function then(){
		if (!schema || !state) return;
		app.emit('sockets ready', state, schema);
	}

	new planet(socket.of('/schema'), app.config.local)
	.on('listening', function(/*host, port*/){
		schema = this;
		this.get(function(values){
			if (!Object.keys(values).length) schema.merge(app.config.schema);
			then();
		});
	});

	new planet(socket, app.config.local)
	.on('listening', function(/*host, port*/){
		state = this;
		this.get(function(values){
			if (!Object.keys(values).length) state.merge(app.config.state);
			then();
		});
	});

});
