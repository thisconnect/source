Controller.string = new Class({

	Extends: Controller,

	selector: 'input[type=text]',

	initialize: function(data){
		this.addEvent('destroy', this.destroy);
		this.addEvent('set', this.set);
		this.create(data);
	},

	input: null,

	create: function(data){
		var input = this.input = new Element(this.selector);

		input.set('placeholder', data.placeholder || '');
		input.addEvent('input', this.onInput.bind(this));

		if (!data.label) this.element = input;
		else {
			this.label = this.label(data.label);
			this.element = this.label;
			this.element.appendText(' ');
			input.inject(this.element);
		}

		this.set(data.value || '');
	},

	destroy: function(){
		this.removeEvents();
		this.input.removeEvents();
		this.element.destroy();
	},

	onInput: function(e){
		this.fireEvent('change', this.input.value);
	},

	set: function(value){
		this.input.value = value;
		return this;
	}

});
