var Controller = new Class({

	Implements: [Events],

	element: null,

	attach: function(container, position){
		this.element.inject(container, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},
	
	label: function(label){
		return new Element('label', {text: label});
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
		console.log(array[0], array[1], array[2].toInt(), data);
		//new Controller[array[1]]();
		//this.add(array[1]);
	}

});
