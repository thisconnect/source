Controller.number = new Class({

	Extends: Controller,

	selector: 'input[type=number]',

	input: null,

	create: function(path, data){
		var input = this.input = new Element(this.selector);

		this.parent(path, data);

		input.addEvent('input', this.send);

		if (!!data.step) input.set('step', data.step);

		if (!!data.range) input.set({
			'min': data.range[0],
			'max': data.range[1]
		});

		this.element.appendText(' ');

		input.inject(this.element);
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
