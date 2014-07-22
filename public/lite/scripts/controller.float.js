/* global Controller */

Controller.float = new Class({

	Extends: Controller.number,

	selector: 'input[type=range]',

	create: function(key, data, widget){
		this.parent(key, data, widget);
		if (data.schema.vertical) this.element.addClass('vertical');
	},

	get: function(){
		return parseFloat(this.input.value);
	}

});
