Controller.object = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.slice(0),
			config = data.config;

		path.push(key);

		this.setup(key, data.config.object || data.config, widget);

		this.attach(data.element);

		widget.build({
			'config': config,
			'element': this.element,
			'path': path
		}, data.value);
	},

	create: function(key, config){
		this.element = new Element(config.fieldset ? 'fieldset' : 'section');
		new Element(config.fieldset ? 'legend' : 'h2', {
			'text': key
		}).inject(this.element);
	},

	destroy: function(){
		this.config = null;
		this.widget = null;
		this.parent();
	}

});
