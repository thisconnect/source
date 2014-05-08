new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'types ready': this.setTypes
		});
		this.bound = {
			'onGet': this.onGet.bind(this),
			'onSet': this.onSet.bind(this),
			'onMerge': this.onMerge.bind(this),
			'onRemove': this.onRemove.bind(this)
		};
	},

	element: new Element('div.state'),

	readySetup: function(){
		this.element.inject(document.body);
	},

	types: null,

	setTypes: function(types){
		this.types = types;
		this.then();
	},

	io: null,

	connect: function(socket){
		(this.io = socket)
			.on('set', this.bound.onSet)
			.on('merge', this.bound.onMerge)
			.on('remove', this.bound.onRemove);

		this.then();
	},

	disconnect: function(){
		this.io
			.removeListener('set', this.bound.onSet)
			.removeListener('merge', this.bound.onMerge)
			.removeListener('remove', this.bound.onRemove);

		this.io = null;
	},

	then: function(){
		if (!!this.io && !!this.types){
			this.io.emit('get', this.bound.onGet)
		}
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

	onGet: function(data){
		for (var widget in data){
			this.publish('state ' + widget + ' delete');
			this.addWidget('state', widget);
			this.publish('state ' + widget + ' merge', [data[widget]]);
		}
	},

	onSet: function(key, value){
		if (typeof key == 'string'){
			// console.log('onSet', key, value);
			this.addWidget('state', key);
			this.publish('state ' + key + ' merge', value);
		} else {
			// console.log('onSet', key.join('.'), value);
			this.publish('state ' + key[0] + ' set', [key.slice(1), value]);
		}
	},

	onRemove: function(widget){
		this.publish('state ' + widget + ' delete');
	},

	onMerge: function(data){
		// console.log('onMerge', data);
		for (var widget in data){
			this.publish('state ' + widget + ' merge', data[widget]);
		}
	},

	addWidget: function(context, name){
		var widget = new Widget(name),
			build = widget.build.bind(widget, {
				'config': this.types[name]
			}),
			unsubscribe = this.unsubscribe.bind(this),
			id = context + ' ' + name;

		function set(path, value){
			console.log('set:::', path.join(' '), value);
			widget.fireEvent(path.join(' '), value);
		}

		function destroy(){
			unsubscribe(id + ' set', set);
			unsubscribe(id + ' merge', build);
			unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		widget.addEvent('change', this.set.bind(this));
		widget.addEvent('remove', this.remove.bind(this, name));

		this.subscribe(id + ' set', set);
		this.subscribe(id + ' merge', build);
		this.subscribe(id + ' delete', destroy);

		widget.attach(this.element);
		
	}

});
