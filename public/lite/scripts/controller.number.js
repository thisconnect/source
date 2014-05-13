Controller.number = new Class({

	Extends: Controller,

	selector: 'input[type=number]',

	input: null,

	create: function(key, data, widget){
		var config = data.config || {};

		var input = this.input = new Element(this.selector)
			.addEvent('input', this.send)
			.inject(this.element);

		if (!!config.step) input.set('step', config.step);

		if (!!config.range) input.set({
			'min': config.range[0],
			'max': config.range[1]
		});

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
		return parseInt(this.input.value);
	}

});
