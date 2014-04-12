new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect
		});
		this.bound = {
			'onConnect': this.onConnect.bind(this),
			'onGet': this.onGet.bind(this),
			'onSet': this.onSet.bind(this),
			'onMerge': this.onMerge.bind(this),
			'onRemove': this.onRemove.bind(this)
		};
	},

	io: null,

	connect: function(socket){
		(this.io = socket.of('/type'))
			.once('connect', this.bound.onConnect)
			.on('set', this.bound.onSet)
			.on('merge', this.bound.onMerge);
	},

	disconnect: function(){
		// this.io.removeListener('set');
		// this.io.removeListener('remove');
		// this.io.removeListener('merge');
		this.io = null;
	},

	types: {},

	onConnect: function(){
		this.io.emit('get', this.bound.onGet);
	},

	onGet: function(data){
		this.types = data;
		this.publish('types connect', this.types);
	},

	onSet: function(id, value){
		console.log('types:onSet', id, value);
		this.publish('local ' + id + ' set', [key, value]);
	},

	onRemove: function(key){
		this.publish('local ' + key + ' delete');
	},

	onMerge: function(data){
		for (var key in data){
			console.log('types:onMerge for key in data', key, data[key]);
			this.types[key] = data[key];
			// this.publish('local ' + key + ' merge', data[key]);
		}
		console.log('types.types', this.types);
	}

});
