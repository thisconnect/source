new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create,
			'types set': this.setTypes
		});
	},

	types: {},

	setTypes: function(types){
		this.types = types;
	},

	create: function(context, name, types){
		var publish = this.publish.bind(this),
			subscribe = this.subscribe.bind(this),
			unsubscribe = this.unsubscribe.bind(this),
			widget = new Widget(name, types);

		var id = context + ' ' + name;

		Object.forEach(types, function(type, key){
			var control = widget.addControl(type, key);

			control.addEvent('change', function(value){
				publish(context + ' set', [[name, key], value]);
			});
		});

		function set(key, value){
			widget.controls[key].fireEvent('set', value);
		}

		function merge(state){
			console.log('types', types, this.types[name]);
			console.log('state', state);
			for (var key in state){
				if (!widget.controls[key]) console.log('create controller', key);
				widget.controls[key].fireEvent('set', state[key]);
			}
		}

		function destroy(){
			unsubscribe(id + ' set', set);
			unsubscribe(id + ' merge', merge);
			unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		subscribe(id + ' set', set);
		subscribe(id + ' merge', merge);
		subscribe(id + ' delete', destroy);

		widget.addEvent('delete', function(){
			publish(context + ' remove', name);
		});

		publish(context + ' add', widget);
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
		var control,
			type = data.type.capitalize(),
			array = type.match(this.brakets);

		if (!array) control = new Controller[type](data);
		else control = new Controller.Array(array, data);

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
