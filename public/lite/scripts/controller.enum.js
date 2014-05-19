Controller.enum = new Class({

	Extends: Controller,

	selector: 'select',

	select: null,

	create: function(key, data, widget){
		var schema = data.schema || {};

		(this.select = new Element(this.selector))
			.addEvent('change', this.send)
			.inject(this.element);

		this.addOptions(schema.values);

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
