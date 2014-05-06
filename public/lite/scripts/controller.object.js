Controller.object = new Class({

	Extends: Controller,

	path: null,
	widget: null,

	initialize: function(key, data, widget){
		this.path = data.path.slice(0);
		this.path.push(key);
		this.widget = widget;
		this.parent(key, data, widget);
	},

	selector: 'section',

	config: null,

	create: function(key, config){
		this.config = config;
		this.element = new Element(this.selector);
		new Element('h2', {
			'text': key
		}).inject(this.element);
	},

	destroy: function(){
		this.config = null;
		this.widget = null;
		this.parent();
	},

	set: function(values){
		this.widget.build(values, {
			'config': this.config,
			'element': this.element,
			'path': this.path
		});
	}

});
