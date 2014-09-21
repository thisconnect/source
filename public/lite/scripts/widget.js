/* exported Widget */
/* global Controller */

var Widget = new Class({

	Implements: [Events],

	id: null,

	schema: null,

	initialize: function(key, schema){
		this.id = key;
		this.schema = schema;
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

		this.addEvent('destroy', this.destroy);
	},

	destroy: function(){
		this.removeEvents();
		this.element.destroy();
		this.schema = null;
	},

	build: function(data, values){
		var schema = data.schema;

		if (!data.path){
			this.addControl(this.id, {
				'schema': schema
				, 'element': this.element
				, 'path': []
				, 'value': values
			});
		} else {
			if (!!values.$type) schema = this.getDefinition('#/definitions/' + values.$type).schema;

			for (var key in values){
				if (!values.hasOwnProperty(key)) continue;

				this.addControl(key, {
					'schema': schema.items || (schema.properties && schema.properties[key]) || {}
					, 'element': data.element || this.element
					, 'path': data.path
					, 'array': data.array
					, 'collection': data.collection
					, 'value': values[key]
				});
			}
		}
	},

	addControl: function(key, data){

		if (!!data.schema.$ref){
			data.schema = this.getDefinition(data.schema.$ref).schema;
			// return this.addControl(key, data);
		}
		if (!!data.value && !!data.value.$type && !!data.schema.anyOf){
			console.log('GET anyOf BY $type!!', key, data);
			// data.schema = this.getDefinition('#/definitions/' + data.value.$type).schema;
			// console.log(data.schema);
		}
		var type = data.schema.type
			|| (Array.isArray(data.value) && 'array')
			|| typeof data.value;

		if (!Controller[type]) return console.log('ERROR', type, 'is not a controller');

		return new Controller[type](key, data, this);
	},

	get: function(path){
		var schema = this.schema;
		for (var i = 0, l = path.length; i < l; i++){
			if (hasOwnProperty.call(schema, path[i])) schema = schema[path[i]];
			else return schema[path[i]];
		}
		return schema;
	},

	getDefinition: function(ref){
		var path = ref.split('#/')[1].split('/');
		return {
			name: path[path.length - 1],
			schema: this.get(path)
		};
	},

	getDefault: function(ref){
		var definition = this.getDefinition(ref),
			schema = definition.schema,
			defaults = {
				'$type': definition.name
			}; // schema.type

		for (var key in schema.properties){
			if (key != '$type') defaults[key] = schema.properties[key].default;
		}
		return defaults;
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
