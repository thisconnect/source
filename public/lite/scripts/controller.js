var Controller = new Class({

	Implements: [Events, Bound],

	initialize: function(type, data){
		var array = type.match(/(.*?)\[(.*?)\]/);
		type = type.capitalize();
		if (!array) return new Controller[type](data);
		return new Controller.Array(array, data);
	},

	$element: null,

	build: function(){
		this.$element = new Element('div.control-group');
		return this;
	},

	attach: function(container, position){
		this.$element.inject(container || document.body, position || 'bottom');
		return this;
	},

	detach: function(){
		this.$element.dispose();
		return this;
	},

	add: function(selector, options){
		return new Element(selector, options).inject(this.$element);
	},

	set: function(value){
		return this;
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
		this.build(array, data);
	},

	build: function(array, data){
		console.log(array[1], array[2].toInt(), data);
		this.parent();
		//new Controller[array[1]]();
		//this.add(array[1]);
	}

});
