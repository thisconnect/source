Controller.Bool = new Class({

	Extends: Controller,

	initialize: function(data){
		this.build(data);
		this.element.addEvent('change', this.onChange.bind(this));
	},

	build: function(data){
		var container, label, input;
		this.parent();

		label = new Element('label.checkbox', {
			'text': data.label
		});
		input = this.element = new Element('input[type=checkbox]');

		container = this.add('div.controls');
		label.inject(container);
		input.inject(label, 'top');
	},

	create: function(){
		return;
	},

	onChange: function(){
		this.fireEvent('quickchange', this.element.checked);
	},

	set: function(value){
		this.element.checked = !!value;
		return this;
	}

});
