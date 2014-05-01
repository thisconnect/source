new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'types ready': this.setTypes,
			'state set': this.set,
			'state merge': this.merge,
			'state remove': this.remove,
			'state add': this.add
		});
		this.bound = {
			'onSet': this.onSet.bind(this),
			'onMerge': this.onMerge.bind(this),
			'onRemove': this.onRemove.bind(this),
			'create': this.create.bind(this)
		};
	},

	element: new Element('div.state'),

	readySetup: function(){
		this.element.inject(document.body);
	},

	io: null,

	connect: function(socket){
		(this.io = socket)
			.on('set', this.bound.onSet)
			.on('merge', this.bound.onMerge)
			.on('remove', this.bound.onRemove);
	},

	disconnect: function(){
		this.io
			.removeListener('set', this.bound.onSet)
			.removeListener('merge', this.bound.onMerge)
			.removeListener('remove', this.bound.onRemove);

		this.io = null;
	},

	types: null,

	setTypes: function(types){
		this.types = types;
		this.io.emit('get', this.bound.create)
	},

	create: function(data){
		for (var widget in data){
			if (!(widget in this.types)){
				this.publish('log', 'this.types[' + widget + '] is missing!');
				continue;
			}
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
		if (typeof key == 'string'){
			this.publish('widget create', ['state', key, this.types[key]]);
			this.publish('state ' + key + ' merge', value);
		} else {
			var data = key.splice(1);
			this.publish('state ' + key[0] + ' set', [data, value]);
			// this.publish('state ' + key[0] + ' set', [key[1], value]);
		}
	},

	onRemove: function(widget){
		this.publish('state ' + widget + ' delete');
	},

	onMerge: function(data){
		for (var widget in data){
			this.publish('state ' + widget + ' merge', data[widget]);
		}
	}

});
