Controller.number = new Class({

	Extends: Controller,

	selector: 'input[type=number]',

	initialize: function(data){
		this.addEvent('destroy', this.destroy);
		this.addEvent('set', this.set);
		this.create(data);
	},

	create: function(data){
		var input = this.input = new Element(this.selector);
		input.addEvent('input', this.onInput.bind(this));

		if (!!data.step) input.set('step', data.step);

		if (!!data.range) input.set({
			'min': data.range[0],
			'max': data.range[1]
		});

		if (!data.label) this.element = input;
		else {
			this.label = this.label(data.label);
			this.element = this.label;
			this.element.appendText(' ');
			input.inject(this.element);
		}

		this.set(data.value || 0);
	},

	destroy: function(){
		this.removeEvents();
		this.input.removeEvents();
		this.element.destroy();
	},

	onInput: function(e){
		this.fireEvent('change', parseInt(this.input.value));
	},

	set: function(value){
		this.input.value = value;
		return this;
	}

});
