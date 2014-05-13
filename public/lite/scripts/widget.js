var Widget = new Class({

	Implements: [Events],

	id: null,

	initialize: function(key){
		this.id = key;
		this.addEvent('destroy', this.destroy);
		this.create();
    },

	element: null,

	create: function(){
		this.element = new Element('section.widget');

		new Element('span.close.button.at-right[text=⨯][tabindex=0]')
			.addEvent('click', this.fireEvent.bind(this, 'remove'))
			.inject(this.element);

		new Element('h2', {
			'text': this.id.capitalize()
		}).inject(this.element);
	},

	destroy: function(){
		this.removeEvents();
		this.element.destroy();
	},

	build: function(data, values){
		for (var key in values){
			if (!values.hasOwnProperty(key)) continue;

			if (!data.config[key]) data.config[key] = {};

			if (Array.isArray(values[key])) data.config[key]['type'] = 'array';

			this.addControl(key, {
				'config': data.config[key]
				, 'element': data.element || this.element
				, 'path': data.path || [this.id]
				, 'array': data.array
				, 'value': values[key]
			});
		}
	},

	brakets: /(.*?)\[(.*?)\]/,

	addControl: function(key, data){
		var type = data.config.type || typeof data.value,
			array = type.match(this.brakets);

//if (Array.isArray(data.value)) return; console.log(key, type);

		new Controller[type](key, data, this);
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
