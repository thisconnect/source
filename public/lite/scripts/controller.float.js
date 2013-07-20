Controller.Float = new Class({

	Extends: Controller.Int,

	selector: 'input[type=range]',

	onChange: function(e){
		this.fireEvent('quickchange', parseFloat(this.input.value));
	}

});
