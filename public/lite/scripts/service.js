/*new Unit({

	socket: null,

	initSetup: function(){
		this.subscribe('service create dsp', this.build);
		this.socket = io.connect('/service');
		this.socket.on('setup', this.onSetup.bind(this));
		this.socket.on('set', this.onSet.bind(this));
	},

	onSetup: function(data){
		for (var service in data){
			this.publish('service create ' + service, data[service]);
		}
	},

	element: new Element('button.btn.btn-mini[text=♫]'),

	build: function(){
		this.element.addEvent('click', this.onToggle.bind(this));
		this.publish('tools add', this.element);
	},

	dsp: false,

	onToggle: function(e){
		e.preventDefault();
		if (!this.dsp) this.element.addClass('active');
		this.send('dsp', this.dsp);
	},

	send: function(service, state){
		this.socket.emit('set', service, !state);
	},

	onSet: function(service, state){
		this[service] = state;
		this.element.set({
			'title': 'turn dsp ' + (this.dsp ? 'on' : 'off')
		})[this.dsp ? 'addClass' : 'removeClass']('active');
	}

});*/
