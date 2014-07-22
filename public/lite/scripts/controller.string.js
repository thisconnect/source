/* global Controller */

Controller.string = new Class({

	Extends: Controller,

	selector: 'input[type=text]',

	pattern: '',

	input: null,

	create: function(key, data, widget){
		var schema = data.schema || {};

		var input = this.input = new Element(this.selector)
			.addEvent('input', this.send)
			.inject(this.element);

		if (schema.placeholder != null) input.set('placeholder', schema.placeholder);

		if (!!schema.maxLength) input.set('maxlength', schema.maxLength);

		if (!!schema.minLength || !!schema.maxLength){
			this.input.set('required', 'required');
			this.pattern = '.{' + (schema.minLength || '') + ',' + (schema.maxLength || '') + '}';
		}

		if (!!this.pattern) input.set('pattern', this.pattern);

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
		return (this.pattern === '' || this.input.checkValidity()) ? this.input.value : null;
	}

});
