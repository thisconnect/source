new Unit({

	initSetup: function(){
		this.subscribe({
			'merge': this.merge,
			'widget update': this.set,
			'widget remove': this.remove,
			'planet connection': this.connect,
			'descriptor ready': this.onReadyDescriptors
		});
	},

	socket: null,

	merge: function(data){
		this.socket.emit('merge', data);
	},

	set: function(key, value){
		this.socket.emit('set', key, value);
	},

	remove: function(key){
		this.socket.emit('delete', key);
	},

	onRemove: function(key){
		this.publish('planet remove', key);
	},

	connect: function(socket){
		var bound = {
			set: this.onSet.bind(this),
			remove: this.onRemove.bind(this),
			merge: this.onMerge.bind(this)
		};

		this.socket = socket;

	//	socket.on('get', bound.onPut);
		socket.on('set', bound.set);
		socket.on('merge', bound.merge);
	//	socket.on('delete', bound.remove);

		socket.emit('get', bound.merge);
	},

	ready: false,

	queue: {},

	onReadyDescriptors: function(){
		this.ready = true;
		this.onMerge(this.queue);
		this.queue = {};
	},

	onMerge: function(data){
		if (!this.ready) this.queue = data;
		else for (var pos in data){
			this.publish('widget create', [parseFloat(pos), data[pos]]);
		}
	},

	onSet: function(key, value){
		if (key != null) this.publish('planet update ' + key, value);
		if (typeof key != 'string') key = key.join(' ');
		this.publish('planet update ' + key, value);
	}

});
