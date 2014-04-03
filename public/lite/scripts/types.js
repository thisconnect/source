new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect
		});
		this.bound.onGet = this.onGet.bind(this);
		this.bound.onConnect = this.onConnect.bind(this);
	},

	io: null,

	connect: function(socket){
		this.io = socket.of('/type');
		this.io.once('connect', this.bound.onConnect);
	},

	disconnect: function(){
		this.io.removeListener('set');
		this.io.removeListener('remove');
		this.io.removeListener('merge');
		this.io = null;
	},

	types: {},

	onConnect: function(){
		this.io.emit('get', this.bound.onGet);
	},

	onGet: function(data){
		TYPES = this.types = data;
		this.publish('types connect', this.types);
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
		console.log('types:onMerge', data);
	}

});
