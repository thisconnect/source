Controller.String = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		var label, wrapper, input;
		this.parent();

		label = this.add('label.control-label', {
			'text': data.label
		});
		wrapper = this.add('div.controls');
		input = this.element = new Element('input.span12[type=text]');
		wrapper.adopt(input);

		if (data.placeholder) input.set('placeholder', data.placeholder);
	},

	onChange: function(e){
		this.fireEvent('quickchange', this.element.value);
	},

	set: function(value){
		this.element.value = value;
		return this;
	}

});
