new Unit({

	element: new Element('div.local'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'socket disconnect': this.disconnect,
			'local connect': this.connect,
			'local set': this.set,
			'local remove': this.remove,
			'local merge': this.merge,
			'local type connect': this.connectType,
			'local add': this.add
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	type: null,

	setup: function(local){
		this.io = local;

		local.on('set', this.onSet.bind(this));
		local.on('remove', this.onRemove.bind(this));
		local.on('merge', this.onMerge.bind(this));

		this.type = local.of('/type');
		this.publish('local type connect', this.type);
		this.publish('local connect', this.io);
	},

	types: {},

	connectType: function(type){
		var that = this;
		type.emit('get', function(data){
			console.log('local type', data);
			that.types = data;
		});
	},

	connect: function(local){
		var that = this;
		this.publish('widget destroy', 'local');
		local.emit('get', function(data){
			console.log('local', data);
			for (var widget in data){
				if (!(widget in that.types)) continue;
				that.publish('widget create', ['local', widget, that.types[widget]]);
			}
		});
	},

	set: function(path, value){
		console.log('local set', path, value);
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

	onSet: function(key, value){
		console.log('onSet', key, value);
	},

	onRemove: function(key){
		console.log('onRemove', key);
	},

	onMerge: function(data){
		console.log('onMerge', data);
	},

	disconnect: function(){
		//this.local.removeAllListeners();
		//delete this.local;
	},

	add: function(widget){
		widget.inject(this.element);
	}

});
