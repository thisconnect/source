new Unit({

	element: new Element('div.system'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'socket disconnect': this.disconnect,
			'system connect': this.connect,
			'system add': this.add
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	system: null,

	setup: function(socket){
		var system = this.system = socket.of('/system'),
			connect = this.publish.bind(this, 'system connect', system);

		system.once('connect', connect);
	},

	connect: function(system){
		var that = this;
		this.publish('widget destroy', 'system');
		system.emit('get', function(data){
			that.publish('widget create', ['system', data]);
		});
	},

	disconnect: function(){
		//this.system.removeAllListeners();
		//delete this.system;
	},

	add: function(widget){
		widget.inject(this.element);
	}

});
