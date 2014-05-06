Controller.enum = new Class({

	Extends: Controller,

	selector: 'select',

	select: null,

	create: function(key, config){
		var select = this.select = new Element(this.selector);

		this.addOptions(config.values);

		select.addEvent('change', this.send);
	
		if (config.value == null) config.value = config.values[0];

		this.parent(key, config);

		select.inject(this.element);
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
