Controller.array = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);

		this.setup(key, data, widget);
		
		this.element.appendText(' ');
		//console.log(data.value.every(function(item){ return typeof item == 'object';}));
		widget.build({
			'config': data.config
			, 'element': new Element('ul').inject(this.element)
			, 'path': path
			, 'array': true
		}, data.value);

		this.attach(data.element);
	},

	setup: function(key, data, widget){
		this.element = new Element('div');

		new Element('span', {
			'text': key
		}).inject(this.element);

		this.create(key, data, widget);
	}

});
