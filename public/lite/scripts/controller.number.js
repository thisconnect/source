/* global Controller */

Controller.number = new Class({

	Extends: Controller,

	selector: 'input[type=number]',

	input: null,

	create: function(key, data, widget){
		var schema = data.schema || {};

		var input = this.input = new Element(this.selector)
			.addEvent('input', this.send)
			.inject(this.element);

		if (!!schema.step) input.set('step', schema.step);

		if (!!schema.range) input.set({
			'min': schema.range[0],
			'max': schema.range[1]
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
