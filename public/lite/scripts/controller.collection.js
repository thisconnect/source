Controller.collection = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key),
			config = data.config || {};

		this.setup(key, data, widget);

		var outer = new Element('div.table'),
			table = new Element('table').inject(outer),
			thead = new Element('thead').inject(table);

		(config.headings || Object.keys(data.value[0]))
			.forEach(function(key){
				new Element('th', {'text': key}).inject(thead);
			});

		widget.build({
			'config': config
			, 'element': new Element('tbody').inject(table)
			, 'path': path
			, 'collection': true
		}, data.value);

		outer.inject(this.element);
		this.attach(data.element);
	},

	setup: function(key, data, widget){
		var config = data.config = data.config.array || data.config || {};
		this.element = new Element('div');

		new Element('span', {
			'text': config.label || key
		}).inject(this.element);

		this.create(key, data, widget);
	}

});
