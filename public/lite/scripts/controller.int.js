Controller.Int = new Class({

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
		input = this.element = new Element('input.span12[type=range]');
		wrapper.adopt(input);

		if (data.step) input.set('step', data.step);
		if (data.range) input.set({
			'min': data.range[0],
			'max': data.range[1]
		});
	},

	onChange: function(e){
		this.fireEvent('quickchange', parseInt(this.element.value));
	},

	set: function(value){
		this.element.value = value;
		return this;
	}

});
