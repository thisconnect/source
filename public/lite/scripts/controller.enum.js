Controller.Enum = new Class({

	Extends: Controller,

	selector: 'select',

	initialize: function(data){
		var select = this.select = new Element(this.selector);

		this.addOptions(data.values);

		select.addEvent('change', this.onChange.bind(this));

		if (!data.label) this.element = select;
		else {
			this.label = this.label(data.label);
			this.element = this.label;
			select.inject(this.element);
		}

		this.set(data.value || data.values[0]);
	},

	addOptions: function(values){
		var i = values.length;
		while (i--){
			new Element('option', {
				text: values[i].capitalize(),
				value: values[i]
			}).inject(this.select, 'top');
		}
	},

	onChange: function(){
		this.fireEvent('quickchange', this.select.get('value'));
	},

	set: function(value){
		this.select.set('value', value);
		return this;
	}

});
