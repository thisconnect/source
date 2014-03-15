new Unit({

	element: new Element('div.local'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'local set': this.set,
			'local merge': this.merge,
			'local remove': this.remove,
			'local add': this.add,
			'local type connect': this.connectType
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	type: null,

	connect: function(io){
		console.log('SOCKET CONNECT');
		var that = this;

		this.io = io;

		io.on('set', this.onSet.bind(this));
		io.on('remove', this.onRemove.bind(this));
		io.on('merge', this.onMerge.bind(this));

		this.type = io.of('/type');

		this.type.once('connect', function(){
			that.publish('local type connect', that.type);
			that.setup(io);
		});
	},

	disconnect: function(){
		this.io.removeListener('set');
		this.io.removeListener('remove');
		this.io.removeListener('merge');
		this.io = null;
		this.type = null;
	},

	types: {},

	connectType: function(type){
		var that = this;
		type.emit('get', function(data){
			that.types = data;
		});
	},

	setup: function(local){
		var that = this;
		this.publish('widget destroy', 'local');
		local.emit('get', function(data){
			for (var widget in data){
				if (!(widget in that.types)) continue;
				// console.log('DELETE', ['local', widget, 'delete'].join(' '));
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
		console.log('local remove', key);
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
		console.log('onRemove', key);
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
