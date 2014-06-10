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
		(this.io = socket.of('/schema'))
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

	schema: {},

	onConnect: function(){
		this.io.emit('get', this.bound.onGet);
		this.publish('schema connect', this.io);
	},

	onGet: function(data){
		this.schema = data;
		this.publish('schema ready', this.schema);
	},

	onSet: function(key, value){
		console.log('schema onSet');
		this.schema[key] = value;
	},

	onMerge: function(data){
		console.log('schema onMerge', data);
		this.merge(this.schema, data);
	},

	merge: function merge(o1, o2){
		for (var p in o2) {
			o1[p] = (
				o1[p] != null
				&& o2[p] != null
				&& !Array.isArray(o1[p])
				&& !Array.isArray(o2[p])
				&& typeof o1[p] == 'object'
				&& typeof o2[p] == 'object'
			) ? merge(o1[p], o2[p]) : o2[p];
		}
		return o1;
	}

});
