Controller.object = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);

		this.setup(key, data, widget);

		widget.build({
			'config': data.config,
			'element': this.element,
			'path': path
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var config = data.config.object || data.config || {};

		if (data.array){
			this.element = new Element('li');
		} else {
			this.element = new Element(config.fieldset ? 'fieldset' : 'section');

			new Element(config.fieldset ? 'legend' : 'h2', {
				'text': key
			}).inject(this.element);
		}

		this.create(key, data, widget);
	}

});
