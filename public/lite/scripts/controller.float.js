Controller.float = new Class({

	Extends: Controller.number,

	selector: 'input[type=range]',

	create: function(key, data, widget){
		this.parent(key, data, widget);
		if (data.config.vertical) this.input.addClass('vertical');
	},

	get: function(){
		return parseFloat(this.input.value);
	}

});
