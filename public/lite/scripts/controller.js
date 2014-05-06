var Controller = new Class({

	send: null,

	initialize: function(key, data, widget){
		var path = data.path.slice(0);

		path.push(key);

		this.send = function(){
			widget.fireEvent('change', [path, this.get()]);
		}.bind(this);

		this.create(key, data.config);

		if (data.config.important) this.setImportant();
		if (data.config.columns) this.setColumns(data.config.columns);

		this.set(data.value);

		// widget.addEvent('destroy', this.destroy);

		widget.addEvent(path.slice(1).join(' '), this.set.bind(this));

		this.attach(data.element);
	},

	element: null,

	create: function(key, config){
		this.element = new Element('label', {
			text: config.label || key,
			title: config.desc || null
		});
	},

	destroy: function(){
		this.removeEvents();
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

	setImportant: function(){
		this.element.addClass('button').addClass('at-right');
	},

	setColumns: function(columns){
		this.element.addClass('columns' + columns);
	}/*,

	$enabled: true,

	isEnabled: function(){
		return !!this.$enabled;
	},

	enable: function(){
		this.$enabled = true;
		return this;
	},

	disable: function(){
		this.$enabled = false;
		return this;
	}*/

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
