(function(){

var Bound = this.Bound = new Class({

	$bound: {},

	bound: function(name){
		var bound = this.$bound,
			fn = this[name];
		if (!fn || typeof fn != 'function') return null;
		return bound[name] || (bound[name] = fn.bind(this));
	}

});

})();
