Controller.float = new Class({

	Extends: Controller.number,

	selector: 'input[type=range]',

	get: function(){
		return parseFloat(this.input.value);
	}

});
