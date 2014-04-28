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
			'onMerge': this.onMerge.bind(this)
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
		this.io
			.removeListener('set', this.bound.onSet)
			.removeListener('merge', this.bound.onMerge);

		this.io = null;
	},

	types: {},

	onConnect: function(){
		this.io.emit('get', this.bound.onGet);
		this.publish('types connect', this.io);
	},

	onGet: function(data){
		this.types = data;
		this.publish('types ready', this.types);
	},

	onSet: function(id, value){
		this.types[id] = value;
	},

	onMerge: function(data){
		for (var key in data){
			this.types[key] = data[key];
		}
	}

});
