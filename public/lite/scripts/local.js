new Unit({

	element: new Element('div.local'),

	initSetup: function(){
		this.subscribe({
			'socket connect': this.setup,
			'socket disconnect': this.disconnect,
			'local set': this.set,
			'local remove': this.remove,
			'local merge': this.merge,
			'local add': this.add,
			'local type connect': this.connectType
		});
	},

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	type: null,

	setup: function(local){
		var that = this;

		this.io = local;

		local.on('set', this.onSet.bind(this));
		local.on('remove', this.onRemove.bind(this));
		local.on('merge', this.onMerge.bind(this));

		this.type = local.of('/type');

		this.type.on('connect', function(){
			that.publish('local type connect', that.type);
			that.connect(that.io);
		});
	},

	types: {},

	connectType: function(type){
		//console.log('local type connect');
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
				console.log('widget', data[widget]);
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
