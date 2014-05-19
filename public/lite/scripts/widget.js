var Widget = new Class({

	Implements: [Events],

	id: null,

	initialize: function(key, schema){
		this.id = key;
		this.addEvent('destroy', this.destroy);
		this.create(schema);
    },

	element: null,

	create: function(schema){
		this.element = new Element('section.widget');

		new Element('span.close.button.at-right[text=⨯][tabindex=0]')
			.addEvent('click', this.fireEvent.bind(this, 'remove'))
			.inject(this.element);

		new Element('h2', {
			'text': schema.title || this.id
		}).inject(this.element);
	},

	destroy: function(){
		this.removeEvents();
		this.element.destroy();
	},

	build: function(data, values){
		var properties = data.schema.properties || {};

		for (var key in values){
			if (!values.hasOwnProperty(key)) continue;

			this.addControl(key, {
				'schema': data.schema.items || properties[key] || {}
				, 'element': data.element || this.element
				, 'path': data.path || [this.id]
				, 'array': data.array
				, 'collection': data.collection
				, 'value': values[key]
			});
		}
	},

	brakets: /(.*?)\[(.*?)\]/,

	addControl: function(key, data){
		var type = data.schema.type || (Array.isArray(data.value) && 'array') || typeof data.value,
			array = type.match(this.brakets);

		if (!Controller[type]) return console.log('ERROR', type, 'is no controller');

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
