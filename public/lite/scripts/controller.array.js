Controller.array = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key),
			config = data.config || {};

		this.setup(key, data, widget);
		
		widget.build({
			'config': config
			, 'element': new Element('ul').inject(this.element)
			, 'path': path
			, 'array': true
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var config = data.config = data.config.array || data.config || {};
		this.element = new Element('div');

		new Element('span', {
			'text': config.label || key
		}).inject(this.element);

		this.create(key, data, widget);
	}

});
