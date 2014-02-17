// depricated

new Unit({

	element: new Element('div.state'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.prepare,
			'system connect': this.setup,
			'state connect': this.connect,
			'state set': this.set,
			'state remove': this.remove,
			'state merge': this.merge
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	state: null,

	prepare: function(socket){
		this.io = socket;
	},

	setup: function(){
		var state = this.state = this.io.of('/state');
		state.on('set', this.onSet.bind(this));
		state.on('remove', this.onRemove.bind(this));
		state.on('merge', this.onMerge.bind(this));
		state.once('connect', this.publish.bind(this, 'state connect', state));
	},

	connect: function(state){
		var that = this;
		state.emit('get', function(data){
			console.log('state', data);
			that.publish('widget create', ['state', data]);
	//		that.pre.set('text', 'state: ' + JSON.stringify(data, null, '\r\t'));
		});
	},

	set: function(path, value){
		this.state.emit('set', path, value);
	},

	remove: function(key){
		this.state.emit('remove', key);
	},

	merge: function(data){
		this.state.emit('merge', data);
	},

	onSet: function(key, value){
		// console.log('onSet', key, value);
	},

	onRemove: function(key){
		// console.log('onRemove', key);
	},

	onMerge: function(data){
		// console.log('onMerge', data);
	}

});
