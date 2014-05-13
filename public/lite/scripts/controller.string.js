Controller.string = new Class({

	Extends: Controller,

	selector: 'input[type=text]',

	input: null,

	create: function(key, data, widget){
		var config = data.config || {};

		var input = this.input = new Element(this.selector)
			.addEvent('input', this.send)
			.inject(this.element);

		if (config.placeholder != null) input.set('placeholder', config.placeholder);

		this.parent(key, data, widget);
	},

	destroy: function(){
		this.input.removeEvents();
		this.parent();
	},

	set: function(value){
		this.input.value = value;
		return this;
	},

	get: function(){
		return this.input.value;
	}

});
