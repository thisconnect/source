new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'socket connect': this.connect,
			'socket disconnect': this.disconnect,
			'types ready': this.setTypes
		});
		this.bound = {
			'subscribe': this.subscribe.bind(this),
			'unsubscribe': this.unsubscribe.bind(this),
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
			this.create('state', widget);
			this.publish('state ' + widget + ' merge', [data[widget]]);
		}
	},

	onSet: function(key, value){
		if (typeof key == 'string'){
			this.create('state', key);
			this.publish('state ' + key + ' merge', value);
		} else {
			this.publish('state ' + key[0] + ' set', [key.slice(1), value]);
		}
	},

	onRemove: function(widget){
		this.publish('state ' + widget + ' delete');
	},

	onMerge: function(data){
		for (var widget in data){
			this.publish('state ' + widget + ' merge', data[widget]);
		}
	},

	create: function(context, name){

		var that = this,
			types = this.types,
			bound = this.bound,
			widget = new Widget(name, types[name]);


		function addControl(type, key, value){

			if (typeof value == 'object' && !Array.isArray(value)){

				widget.addTitle(Array.isArray(key) ? key.getLast() : key);
				for (var k in value){
					addControl(type[k], [key, k], value[k]);
				}

			} else {
				if (Array.isArray(value)) return;
				
				var path = [name, key].flatten();
				console.log(name, 'addControl', [key].flatten().join('.'));

				widget.addControl(type, [key].flatten(), value)
					.addEvent('change', function(value){
						that.set(path, value);
					});
			}
		}

		function set(path, value){
			// console.log(name, 'set', path.join(' '), value);
			widget.controls[path.join(' ')].set(value);
		}

		function merge(data){
			for (var key in data){
				//console.log('__', types[name][key], key, data[key]);
				if (!widget.controls[key]) addControl(types[name][key], key, data[key]);
			}
		}

		var id = context + ' ' + name;

		function destroy(){
			that.unsubscribe(id + ' set', set);
			that.unsubscribe(id + ' merge', merge);
			that.unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		this.subscribe(id + ' set', set);
		this.subscribe(id + ' merge', merge);
		this.subscribe(id + ' delete', destroy);

		widget.addEvent('remove', function(){
			that.remove(name);
		});

		widget.attach(this.element);
	}

});
