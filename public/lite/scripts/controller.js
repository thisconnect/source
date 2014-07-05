var Controller = new Class({

	send: function(path, get){
		var value = get();
		if (value != null) this.fireEvent('change', [path, value]);
	},

	initialize: function(key, data, widget){
		var path = data.path.concat(key);
		// console.log(path.join('.'));
		this.send = this.send.bind(widget, path, this.get.bind(this));

		widget.addEvent(path.slice(1).join(' '), this.set.bind(this));
		// widget.addEvent('destroy', this.destroy);

		this.setup(key, data, widget);
		this.attach(data.element);
	},

	element: null,

	label: 'label',

	setup: function(key, data, widget){
		var schema = data.schema || {};

		this.element = data.array ? new Element('li')
			: data.collection ? new Element('td')
			: new Element(this.label, {
				text: (schema.title || key) + ' '
			});

		this.create(key, data, widget);
	},

	create: function(key, data, widget){
		var schema = data.schema || {};

		if (schema.description) this.element.set('title', schema.description);
		if (schema.important) this.setImportant();
		if (schema.columns) this.setColumns();
		if (schema.disabled) this.disable();
		if (schema.enable) this.setupEnable(widget, schema.enable);
		if (schema.disable) this.setupDisable(widget, schema.disable);
	},

	destroy: function(){
		this.element.destroy();
	},

	attach: function(container, position){
		this.element.inject(container, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	set: function(value){
		this.element.set('text', value);
		return this;
	},

	get: function(){
		return this.element.get('text');
	},

	setImportant: function(){
		this.element.addClass('at-right');
	},

	setColumns: function(){
		this.element.addClass('columns');
	},
	
	setupEnable: function(widget, path){
		path = path.slice(1).join(' ');
		widget.addEvent(path, this.onEnable.bind(this));
	},

	onEnable: function(value){
		if (!!value) this.enable();
		else this.disable();
	},
	
	setupDisable: function(widget, path){
		path = path.slice(1).join(' ');
		widget.addEvent(path, this.onDisable.bind(this));
	},

	onDisable: function(value){
		if (!!value) this.disable();
		else this.enable();
	},

	enable: function(){
		this.element.removeClass('disabled')
			.getElements('button, input, select, textarea')
			.removeProperty('disabled');
	},

	disable: function(){
		this.element.addClass('disabled')
			.getElements('button, input, select, textarea')
			.setProperty('disabled', true);
	},

	focus: function(){
		if (this.input && this.input.focus) this.input.focus();
		else if (this.element && this.element.focus) this.element.focus();
		return this;
	}

});
