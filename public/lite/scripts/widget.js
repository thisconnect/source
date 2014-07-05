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

		var remove = this.fireEvent.bind(this, 'remove');

		new Element('span.close.button.at-right[text=⨯][tabindex=0]')
			.addEvent('keydown:keys(enter)', remove)
			.addEvent('click', remove)
			.inject(this.element);

	},

	destroy: function(){
		this.removeEvents();
		this.element.destroy();
	},

	build: function(data, values){
		var properties = data.schema.properties || {};

		if (!data.path && data.schema.type == 'array') console.log(this.id, data.schema, values);

		if (!data.path) this.addControl(this.id, {
				'schema': data.schema
				, 'element': this.element
				, 'path': []
				, 'value': values
			});
		else for (var key in values){
			if (!values.hasOwnProperty(key)) continue;

			this.addControl(key, {
				'schema': data.schema.items || properties[key] || {}
				, 'element': data.element || this.element
				, 'path': data.path
				, 'array': data.array
				, 'collection': data.collection
				, 'value': values[key]
			});
		}
	},

	addControl: function(key, data){
		var type = data.schema.type
				|| (Array.isArray(data.value) && 'array')
				|| typeof data.value;

		if (!Controller[type]) return console.log('ERROR', type, 'is not a controller');

		return new Controller[type](key, data, this);
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
