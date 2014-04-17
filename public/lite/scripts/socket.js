new Unit({

	bound: {},

	initSetup: function(){
		this.bound = {
			'onConnect': this.onConnect.bind(this),
			'onDisconnect': this.onDisconnect.bind(this),
			'toggle': this.toggle.bind(this)
		};
	},

	element: new Element('header'),

	button: new Element('a[href="#connect"].float-right'),

	info: new Element('span.info'),

	warning: new Element('span.warning'),

	readySetup: function(){
		this.button.addEvent('click', this.bound.toggle);
		this.info.inject(this.element);
		this.warning.inject(this.element);
		this.element.appendText(' ');
		this.button.inject(this.element);
		this.element.appendText(' ');
		this.element.inject(document.body);
		this.connect();
	},

	options: {
		'resource': 'io'
		, 'transports': ['websocket']
		, 'try multiple transports': false
		, 'force new connection': true
	},

	io: null,

	connect: function(){
		(this.io = io.connect(null, this.options))
		.on('connect', this.bound.onConnect)
		.on('disconnect', this.bound.onDisconnect)
		.on('reconnect', this.publish.bind(this, 'socket reconnect'));

		this.button.set('text', 'conntecting');
		this.info.set('text', ' trying to connect');
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
		this.info.set('text',
			'connected to '
			+ this.io.socket.options.host
			+ ':' + this.io.socket.options.port
		);

		this.warning.set('text', '');
		this.button.set('text', 'disconnect');

		this.publish('socket connect', this.io);
	},

	onDisconnect: function(){
		this.info.set('text', '');
		this.warning.set('text', 'oh no, connection lost!');
		this.button.set('text', 'connect');

		this.publish('socket disconnect');
	}

});
