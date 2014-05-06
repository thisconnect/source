Controller.boolean = new Class({

	Extends: Controller,

	selector: 'input[type=checkbox]',

	input: null,

	create: function(path, data){
		var input = this.input = new Element(this.selector);

		this.parent(path, data);

		input.addEvent('change', this.send);

		input.inject(this.element, 'top');
	},

	destroy: function(){
		this.input.removeEvents();
		this.parent();
	},

	set: function(value){
		this.input.checked = !!value;
		return this;
	},

	get: function(){
		return !!this.input.checked;
	}

});
