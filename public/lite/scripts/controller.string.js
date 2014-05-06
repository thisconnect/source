Controller.string = new Class({

	Extends: Controller,

	selector: 'input[type=text]',

	input: null,

	create: function(path, data){
		var input = this.input = new Element(this.selector);

		this.parent(path, data);

		if (data.placeholder != null) input.set('placeholder', data.placeholder);

		input.addEvent('input', this.send);

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
		return this.input.value;
	}

});
