Controller.boolean = new Class({

	Extends: Controller,

	selector: 'input[type=checkbox]',

	initialize: function(data){
		this.addEvent('destroy', this.destroy);
		this.addEvent('set', this.set);
		this.create(data);
	},

	input: null,

	create: function(data){
		var input = this.input = new Element(this.selector);

		input.addEvent('change', this.onChange.bind(this));

		if (!data.label) this.element = input;
		else {
			this.element = this.label(data.label);
			input.inject(this.element, 'top');
		}

		this.set(data.value || false);
	},

	destroy: function(){
		this.removeEvents();
		this.input.removeEvents();
		this.element.destroy();
	},

	onChange: function(){
		this.fireEvent('change', this.input.checked);
	},

	set: function(value){
		this.input.checked = !!value;
		return this;
	}

});
