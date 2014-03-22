new Unit({

	element: new Element('div.local'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'local set': this.set,
			'local merge': this.merge,
			'local remove': this.remove,
			'local add': this.add
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	type: null,

	connect: function(io){
		this.io = io;
		this.type = io.of('/type');

		io.on('set', this.onSet.bind(this));
		io.on('remove', this.onRemove.bind(this));
		io.on('merge', this.onMerge.bind(this));

		this.type.once('connect', this.onTypeConnect.bind(this, this));
	},

	disconnect: function(){
		this.io.removeListener('set');
		this.io.removeListener('remove');
		this.io.removeListener('merge');
		this.io = null;
		this.type = null;
	},

	types: {},

	onTypeConnect: function(that){
		this.type.emit('get', function(data){
			that.types = data;
			that.publish('types set', data);
			that.setup();
		});
	},

	setup: function(){
		var that = this;
		this.publish('widget destroy', 'local');
		this.io.emit('get', function(data){
			for (var widget in data){
				if (!(widget in that.types)) continue;
				that.publish(['local', widget, 'delete'].join(' '));
				that.publish('widget create', ['local', widget, that.types[widget]]);
				that.publish('local ' + widget + ' merge', [data[widget]]);
			}
		});
	},

	set: function(path, value){
		this.io.emit('set', path, value);
	},

	remove: function(key){
		this.io.emit('remove', key);
	},

	merge: function(data){
		console.log('local merge', data);
		this.io.emit('merge', data);
	},

	onSet: function(path, value){
		var key = path.pop(-1);
		this.publish('local ' + path.join(' ') + ' set', [key, value]);
	},

	onRemove: function(key){
		this.publish('local ' + key + ' delete');
	},

	onMerge: function(data){
		for (var key in data){
			this.publish('local ' + key + ' merge', data[key]);
		}
		console.log('onMerge', data);
	},

	add: function(widget){
		widget.attach(this.element);
	}

});
