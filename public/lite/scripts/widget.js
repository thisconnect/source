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
