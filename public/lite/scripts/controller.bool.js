Controller.Bool = new Class({

	Extends: Controller,

	selector: 'input[type=checkbox]',

	initialize: function(data){
		var input = this.input = new Element(this.selector);

		input.addEvent('change', this.onChange.bind(this));

		if (!data.label) this.element = input;
		else {
			this.element = this.label(data.label);
			input.inject(this.element, 'top');
		}

		this.set(data.value || false);
	},

	onChange: function(){
		this.fireEvent('quickchange', this.input.checked);
	},

	set: function(value){
		this.input.checked = !!value;
		return this;
	}

});
