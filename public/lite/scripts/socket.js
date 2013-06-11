new Unit({

	element: new Element('button[text="connect"]'),

	io: null,

	options: {
		resource: 'io'
	},

	readySetup: function(){
		/**/
		this.subscribe('system connect', function(system){
			system.emit('get', function(data){
				console.log('system', data);
			});
		});
		this.subscribe('state connect', function(state){
			state.emit('get', function(data){
				console.log('state', data);
			});
		});
		
		this.publish('tools add', this.element);
		this.element.addEvent('click', this.toggle.bind(this));
		this.connect();
	},

	connect: function(){
		var socket = this.io = io.connect(null, this.options);
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		this.publish('planet connection', socket);
	},

	disconnect: function(){
		this.io.disconnect();
	//	this.io.removeAllListeners();
	//	this.io.socket.removeAllListeners();
	},

	reconnect: function(){
		this.element.set('text', 'reconnect');
		this.io.socket.reconnect();
	},

	isConnected: function(){
		return this.io.socket.connected;
	},

	onConnect: function(){
		var system = this.io.of('/system', this.options),
			state = this.io.of('/state', this.options);

		this.element.set('text', 'connected');
		system.once('connect', this.publish.bind(this, 'system connect', system));
		state.once('connect', this.publish.bind(this, 'state connect', state));
		this.publish('planet connect', this.io);
	},

	onDisconnect: function(){
		this.element.set('text', 'disconnected');
		this.publish('planet disconnect');
	},

	toggle: function(e){
		e.preventDefault();
		if (this.isConnected()) this.disconnect();
		else this.reconnect();
	}

});
