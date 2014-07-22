/* exported Widget */
/* global Controller */

var Widget = new Class({

	Implements: [Events],

	id: null,

	schema: null,

	initialize: function(key, schema){
		this.id = key;
		this.schema = schema;
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
		this.schema = null;
	},

	build: function(data, values){
		var properties = data.schema.properties || {};

		// if (!!data.definitions) this.definitions = data.definitions;

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
				'schema': data.schema.items || properties[key] || {}
				, 'element': data.element || this.element
				, 'path': data.path
				, 'array': data.array
				, 'collection': data.collection
				, 'value': values[key]
			});
		}
	},

	addControl: function(key, data){
		if (!!data.schema.$ref){
			// console.log(key, data.schema);
			data.schema = this.getDefinition(data.schema.$ref);
			return this.addControl(key, data);
		}
		var type = data.schema.type
			|| (Array.isArray(data.value) && 'array')
			|| typeof data.value;

		if (!Controller[type]) return console.log('ERROR', type, 'is not a controller');

		return new Controller[type](key, data, this);
	},

	getDefinition: function(pointer){
		var path = pointer.split('#/')[1].split('/');

		function get(o, path){
			for (var i = 0, l = path.length; i < l; i++){
				if (hasOwnProperty.call(o, path[i])) o = o[path[i]];
				else return o[path[i]];
			}
			return o;
		}

		// console.log(this.schema, path);
		return get(this.schema, path);
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
