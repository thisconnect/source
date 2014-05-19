Controller.object = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);

		this.setup(key, data, widget);

		widget.build({
			'schema': data.schema || {}
			, 'element': this.element
			, 'path': path
			, 'collection': data.collection
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var schema = data.schema || {};

		this.element = data.array ? new Element('li')
			: data.collection ? new Element('tr')
			: new Element(schema.fieldset ? 'fieldset' : 'section')
				.grab(new Element(schema.fieldset ? 'legend' : 'h2', {
					'text': schema.title || key
				}));

		this.create(key, data, widget);
	}

});
