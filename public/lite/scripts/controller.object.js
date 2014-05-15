Controller.object = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key),
			config = data.config || {};

		this.setup(key, data, widget);

		widget.build({
			'config': config
			, 'element': this.element
			, 'path': path
			, 'collection': data.collection
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var config = data.config = data.config.object || data.config || {};

		this.element = data.array ? new Element('li')
			: data.collection ? new Element('tr')
			: new Element(config.fieldset ? 'fieldset' : 'section')
				.grab(new Element(config.fieldset ? 'legend' : 'h2', {
					'text': config.label || key
				}));

		this.create(key, data, widget);
	}

});
