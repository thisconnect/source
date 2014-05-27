Controller.array = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);

		this.setup(key, data, widget);

		widget.build({
			'schema': data.schema || {}
			, 'element': new Element('ul').inject(this.element)
			, 'path': path
			, 'array': true
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var schema = data.schema || {};
		this.element = new Element('div.array');

		new Element('span', {
			'text': schema.title || key
		}).inject(this.element);

		this.create(key, data, widget);
	}

});
