Controller.enum = new Class({

	Extends: Controller,

	selector: 'select',

	select: null,

	create: function(key, data, widget){
		var config = data.config || {};

		if (config.value == null) config.value = config.values[0];

		(this.select = new Element(this.selector))
			.addEvent('change', this.send)
			.inject(this.element);

		this.addOptions(config.values);

		this.parent(key, data, widget);

	},

	destroy: function(){
		this.select.removeEvents();
		this.parent();
	},

	addOptions: function(values){
		var i = values.length;
		while (i--){
			new Element('option', {
				text: values[i],
				value: values[i]
			}).inject(this.select, 'top');
		}
	},

	set: function(value){
		this.select.set('value', value);
		return this;
	},

	get: function(){
		return this.select.get('value');
	}

});
