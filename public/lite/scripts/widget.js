new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'types ready': this.setTypes,
			'widget create': this.create
		});
		this.bound = {
			publish: this.publish.bind(this),
			subscribe: this.subscribe.bind(this),
			unsubscribe: this.unsubscribe.bind(this)
		};
	},

	types: {},

	setTypes: function(types){
		this.types = types;
	},

	create: function(context, name){

		var types = this.types,
			widget = new Widget(name, types[name]),
			bound = this.bound;

		var id = context + ' ' + name;

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
						// console.log('set', [path, value]);
						bound.publish(context + ' set', [path, value]);
					});
			}
		}

		function set(path, value){
			// console.log(widget.controls, path.join(' '));
			widget.controls[path.join(' ')].set(value);
		}

		function merge(state){
			for (var key in state){
				console.log('WHOOOOT??', key, state[key]);
				// widget.controls[key].fireEvent('set', state[key]);
			}
		}

		function update(data){
			Object.forEach(data, function(value, key){
				if (!widget.controls[key]) addControl(types[name][key], key, value);
				// widget.controls[key].fireEvent('set', value);
			});
		}

		function destroy(){
			bound.unsubscribe(id + ' set', set);
			bound.unsubscribe(id + ' merge', merge);
			bound.unsubscribe(id + ' update', update);
			bound.unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		bound.subscribe(id + ' set', set);
		bound.subscribe(id + ' merge', merge);
		bound.subscribe(id + ' update', update);
		bound.subscribe(id + ' delete', destroy);

		widget.addEvent('remove', function(){
			bound.publish(context + ' remove', name);
		});

		bound.publish(context + ' add', widget);
	}

});

var Widget = new Class({

	Implements: [Events],

	brakets: /(.*?)\[(.*?)\]/,

	initialize: function(id, data){
		this.addEvent('destroy', this.destroy);
		this.create(id, data);
    },

	element: null,

	create: function(id, data){
		this.element = new Element('section.widget');

		new Element('span.close.button.at-right[text=⨯][tabindex=0]')
			.addEvent('click', this.fireEvent.bind(this, 'remove'))
			.inject(this.element);

		this.addTitle(id);
	},

	destroy: function(){
		Object.forEach(this.controls, function(control){
			control.fireEvent('destroy');
		});
		this.removeEvents();
		this.element.destroy();
	},

	addTitle: function(text){
		new Element('h2', {
			text: text.capitalize()
		}).inject(this.element);
	},

	controls: {},

	addControl: function(data, path, value){
		var type = (!!data && data.type) || typeof value,
			array = type.match(this.brakets);
		
		// console.log(data, path, value, type);
		
		// if (type == 'object' && !array) return this.addControls(data, path, value);

		if (!data) data = {};
		if (data.label == null) data.label = path.getLast();

		var control = (!array)
			? new Controller[type](data)
			: new Controller.Array(array, data);

		if (!!data.desc) control.setTitle(data.desc);

		control.set(value);
		this.controls[path.join(' ')] = control;
		control.attach(this.element);
		return control;
	},

	attach: function(element, position){
		this.element.inject(element, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	}

});
