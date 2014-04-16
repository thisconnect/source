new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'types connect': this.setTypes,
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

		function addControl(type, key){
			widget.addControl(type, key)
				.addEvent('change', function(value){
					bound.publish(context + ' set', [[name, key], value]);
				});
		}

		Object.forEach(types[name], addControl);

		function set(key, value){
			console.log('asdf');
			widget.controls[key].fireEvent('set', value);
		}

		function merge(state){
			for (var key in state){
				widget.controls[key].fireEvent('set', state[key]);
			}
		}

		function update(a){
			Object.forEach(a, function(value, key){
				if (!widget.controls[key]) addControl(types[name][key], key);
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

		widget.addEvent('delete', function(){
			console.log('widget delete', name, this);
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

		new Element('span.button.float-right[text=⨯]')
			.addEvent('click', this.fireEvent.bind(this, 'delete'))
			.inject(this.element);

		new Element('h2', {
			text: id.capitalize()
		}).inject(this.element);
	},

	destroy: function(){
		Object.forEach(this.controls, function(control){
			control.fireEvent('destroy');
		});
		this.removeEvents();
		this.element.destroy();
	},

	controls: {},

	addControl: function(data, name){
		var type = data.type.capitalize(),
			array = type.match(this.brakets),
			control = (!array)
				? new Controller[type](data)
				: new Controller.Array(array, data);

		this.controls[name] = control;
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
