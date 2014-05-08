var Controller = new Class({

	send: null,

	initialize: function(key, data, widget){
		var path = data.path.slice(0),
			get = this.get.bind(this);

		path.push(key);

		this.send = function(){
			widget.fireEvent('change', [path, get()]);
		};

		this.create(key, data.config);

		if (data.config.important) this.setImportant();
		if (data.config.columns) this.setColumns();
		if (data.config.disabled) this.disable();
		if (data.config.enable) this.setupEnable(widget, data.config.enable);
		if (data.config.disable) this.setupDisable(widget, data.config.disable);

		this.set(data.value);

		// widget.addEvent('destroy', this.destroy);

		widget.addEvent(path.slice(1).join(' '), this.set.bind(this));

		this.attach(data.element);
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
		this.element.removeClass('disabled');
	},

	disable: function(){
		this.element.addClass('disabled');
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
