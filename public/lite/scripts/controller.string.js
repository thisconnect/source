Controller.String = new Class({

	Extends: Controller,

	selector: 'input[type=text]',

	initialize: function(data){
		var input = this.element = new Element(this.selector);

		input.set('placeholder', data.placeholder || '');
		input.addEvent('keyup', this.onChange.bind(this));

		this.set(data.value || '');
	},

	onChange: function(e){
		if (this.value != this.element.value) this.fireEvent('quickchange', this.value = this.element.value);
	},

	set: function(value){
		this.value = this.element.value = value;
		return this;
	}

});
