Controller.Int = new Class({

	Extends: Controller,

	selector: 'input[type=number]',

	initialize: function(data){
		var input = this.input = new Element(this.selector);
		input.addEvent('change', this.onChange.bind(this));

		if (!!data.step) input.set('step', data.step);

		if (!!data.range) input.set({
			'min': data.range[0],
			'max': data.range[1]
		});

		if (!data.label) this.element = input;
		else {
			this.label = this.label(data.label);
			this.element = this.label;
			input.inject(this.element);
		}

		this.set(data.value || 0);
	},

	onChange: function(e){
		this.fireEvent('quickchange', parseInt(this.input.value));
	},

	set: function(value){
		this.input.value = value;
		return this;
	}

});
