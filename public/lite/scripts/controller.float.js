Controller.Float = new Class({

	Extends: Controller.Int,

	onChange: function(e){
		this.fireEvent('quickchange', parseFloat(this.element.value));
	}

});
