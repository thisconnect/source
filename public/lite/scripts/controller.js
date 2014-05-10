var Controller = new Class({

	initialize: function(key, data, widget){
		var path = data.path.slice(0);
		path.push(key);

		this.send = this.send.bind(widget, path, this.get.bind(this));

		widget.addEvent(path.slice(1).join(' '), this.set.bind(this));
		// widget.addEvent('destroy', this.destroy);

		this.setup(key, data.config, widget);
		this.attach(data.element);
	},

	send: function(path, get){
		this.fireEvent('change', [path, get()]);
	},

	setup: function(key, config, widget){
		this.create(key, config);
		if (config.important) this.setImportant();
		if (config.columns) this.setColumns();
		if (config.disabled) this.disable();
		if (config.enable) this.setupEnable(widget, config.enable);
		if (config.disable) this.setupDisable(widget, config.disable);
	},

	element: null,

	create: function(key, config){
		this.element = new Element('label', {
			text: config.label || key,
			title: config.title || null
		});
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
		this.element.addClass('button').addClass('at-right');
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
	}

});

Controller.Array = new Class({

	Extends: Controller,

	initialize: function(array, data){
		this.element = new Element('div');
		this.build(array, data);
	},

	build: function(array, data){
		console.log(array[0], array[1], array[2], data);
		//new Controller[array[1]]();
		//this.add(array[1]);
	}

});
