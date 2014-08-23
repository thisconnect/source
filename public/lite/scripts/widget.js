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

		if (!data.path && schema.type == 'array') console.log(this.id, data, schema);

		// if (!!values.$type) console.log(data.path.join('.'), values.$type);

		if (!data.path) this.addControl(this.id, {
				'schema': schema
				, 'element': this.element
				, 'path': []
				, 'value': values
			});
		else {

			if (!!values.$type) schema = this.getDefinition('#/definitions/' + values.$type);
			//console.log('====', data.path.join('.'), values.$type, data);

			// if (!!values.$type) console.log('???', values.$type, schema);

			for (var key in values){
				if (!values.hasOwnProperty(key)) continue;

				// console.log('>>>', key, schema.items || properties[key]);

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
		// if (key == '$type') console.log('-----', data.path.join('.'), data);

		// if (!!data.schema.oneOf) console.log('oneOf', key, data);
		if (!!data.schema.$ref){
			// console.log('$ref', key, data.schema);
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

		function get(schema, path){
			for (var i = 0, l = path.length; i < l; i++){
				if (hasOwnProperty.call(schema, path[i])) schema = schema[path[i]];
				else return schema[path[i]];
			}
			return schema;
		}

		// console.log(path.join('.'), this.schema);
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
