new Unit({

	element: new Element('div.state'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'types connect': this.getTypes,
			'state set': this.set,
			'state merge': this.merge,
			'state remove': this.remove,
			'state add': this.add
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	setup: function(socket){
		this.io = socket;
		socket.on('set', this.onSet.bind(this));
		socket.on('remove', this.onRemove.bind(this));
		socket.on('merge', this.onMerge.bind(this));
	},

	types: null,

	getTypes: function(types){
		this.types = types;
		this.connect();
	},

	connect: function(){
		// console.log('types', types);
		this.io.emit('get', this.onGet.bind(this));
	},

	onGet: function(data){
		// console.log('state', data);
		for (var widget in data){
			if (!(widget in this.types)) continue;
			this.publish('state ' + widget + ' delete');
			this.publish('widget create', ['state', widget, this.types[widget]]);
			this.publish('state ' + widget + ' merge', [data[widget]]);
		}
	},

	add: function(widget){
		widget.attach(this.element);
	},

	set: function(path, value){
		this.io.emit('set', path, value);
	},

	remove: function(key){
		this.io.emit('remove', key);
	},

	merge: function(data){
		this.io.emit('merge', data);
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
