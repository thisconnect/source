Controller.Enum = new Class({

	Extends: Controller,

	selector: 'select',

	select: null,

	initialize: function(data){
		this.addEvent('destroy', this.destroy);
		this.addEvent('set', this.set);
		this.create(data);
	},

	create: function(data){
		var select = this.select = new Element(this.selector);

		this.addOptions(data.values);

		select.addEvent('change', this.onChange.bind(this));

		if (!!data.label){

			this.element = this.label(data.label);
			select.inject(this.element);

		} else this.element = select;

		this.set(data.value || data.values[0]);
	},

	destroy: function(){
		this.removeEvents();
		this.select.removeEvents();
		this.element.destroy();
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
		this.fireEvent('change', this.select.get('value'));
	},

	set: function(value){
		this.select.set('value', value);
		return this;
	}

});
