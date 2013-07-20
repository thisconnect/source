new Unit({

	options: {
		'resource': 'io'
		, 'transports': ['websocket']
		, 'try multiple transports': false
		, 'force new connection': true
	},

	button: new Element('button.float-left'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.onConnect,
			'socket disconnect': this.onDisconnect
		});
	},

	readySetup: function(){
		this.button.addEvent('click', this.toggle.bind(this));
		this.button.inject(document.body, 'top');
		this.connect();
	},

	io: null,

	connect: function(){
		var socket = this.io = io.connect(null, this.options);
		socket.on('connect', this.publish.bind(this, 'socket connect', socket));
		socket.on('disconnect', this.publish.bind(this, 'socket disconnect'));
		socket.on('reconnect', this.publish.bind(this, 'socket reconnect'));
		this.button.set('text', 'conntecting');
	},

	disconnect: function(){
		this.io.disconnect();
	},

	reconnect: function(){
		this.io.socket.reconnect();
	},

	isConnected: function(){
		return !!this.io && !!this.io.socket.connected;
	},

	toggle: function(e){
		e.preventDefault();
		if (this.isConnected()) this.disconnect();
		else this.reconnect();
	},

	onConnect: function(){
		this.button.set('text', 'connected');
	},

	onDisconnect: function(){
		this.button.set('text', 'disconnected');
	}

});
