Controller.float = new Class({

	Extends: Controller.number,

	selector: 'input[type=range]',

	onChange: function(e){
		this.fireEvent('change', parseFloat(this.input.value));
	}

});
