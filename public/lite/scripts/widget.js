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
			if (Array.isArray(values[key])) continue;

			this.addControl(key, {
				'config': (data.config)[key] || {},
				'element': data.element || this.element,
				'path': data.path || [this.id],
				'value': values[key]
			});
		}
	},

	brakets: /(.*?)\[(.*?)\]/,

	addControl: function(key, data){
		var type = data.config.type || typeof data.value,
			array = type.match(this.brakets);

		if (!array) new Controller[type](key, data, this)
		else new Controller.Array(array, config);
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
