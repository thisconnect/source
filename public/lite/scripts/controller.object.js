Controller.object = new Class({

	Extends: Controller,

	path: null,
	widget: null,
	config: null,

	initialize: function(key, data, widget){
		this.path = data.path.slice(0);
		this.path.push(key);
		this.widget = widget;
		this.config = data.config;
		if (!!data.config.object) data.config = data.config.object;
		this.parent(key, data, widget);
		this.set(data.value);
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
	},

	set: function(values){
		this.widget.build({
			'config': this.config,
			'element': this.element,
			'path': this.path
		}, values);
	}

});
