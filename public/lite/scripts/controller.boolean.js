/* global Controller */

Controller.boolean = new Class({

	Extends: Controller,

	selector: 'input[type=checkbox]',

	label: 'label.checkbox',

	input: null,

	create: function(key, data, widget){
		this.input = new Element(this.selector)
			.addEvent('change', this.send)
			.inject(this.element, 'top');

		this.parent(key, data, widget);
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
