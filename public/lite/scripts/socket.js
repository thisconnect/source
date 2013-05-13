new Unit({

	element: new Element('button.btn.btn-mini[text="☉"][title=local]'),

	readySetup: function(){
		this.publish('tools add', this.element);
		this.element.addEvent('click', this.onToggle.bind(this));
		this.connect();
	},

	socket: null,

	connect: function(uri){
		var socket = this.socket = io.connect(uri, {
			resource: 'io'
		});
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		this.publish('planet connection', socket);

		var system = this.system = io.connect('/system', {
			resource: 'io'
		});
		system.on('connect', function(){
			system.emit('get', function(system){
				console.log('system socket!', system);
			});
		});

		var state = this.system = io.connect('/state', {
			resource: 'io'
		});
		state.on('connect', function(){
			state.emit('get', function(state){
				console.log('state socket!', state);
			});
		});
	},

	connected: false,

	onConnect: function(){
		this.connected = true;
		this.element.set({'title': 'online', 'text': '☄'});
		this.element.addClass('active');
	//	this.publish('planet connect');
	},

	disconnect: function(){
		this.socket.disconnect();
		this.socket.removeAllListeners();
        this.socket.socket.removeAllListeners();
	},

	onDisconnect: function(){
		this.connected = false;
		this.element.set({'title': 'local', 'text': '☉'});
		this.element.removeClass('active');
		this.publish('planet disconnect');
	},

	onToggle: function(e){
		e.preventDefault();
		if (this.connected) this.disconnect();
		else {
			this.element.addClass('active');
			this.socket.socket.reconnect();
		}
	}

});
