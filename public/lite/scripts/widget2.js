new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create,
			'widget destroy': this.destroy
		});
	},

	widgets: {},

	create: function(id, data){
		var widget = this.widgets[id]
			|| (this.widgets[id] = new Widget2(id, data));

		this.publish('system add', widget);
	},

	destroy: function(id){
		if (!this.widgets[id]) return;
		this.widgets[id].destroy();
		delete this.widgets[id];
	}

});

var Widget2 = new Class({

	Implements: Unit,

	brakets: /(.*?)\[(.*?)\]/,

	initialize: function(id, data){
		this.setupUnit();
		this.create(id, data);
    },

	create: function(id, data){
		this.element = new Element('section');
		var control = this.control.bind(this, id);
		Object.forEach(data, control);
	},

	destroy: function(){
		this.element.destroy();
	},

	inject: function(element, position){
		this.element.inject(element, position || 'bottom');
		return this;
	},

	attach: function(element, position){
		this.element.inject(element, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	control: function(id, data, name){
console.log(id, data, name);
		var type = data.type.capitalize(),
			array = type.match(this.brakets),
			publish = this.publish.bind(this),
			control = (!array
				? new Controller[type](data)
				: new Controller.Array(array, data)),
			change = function(value){
				console.log(id, name, value);
				publish('state set', [[id, name], value]);
			};

		control.addEvent('quickchange', change).attach(this.element);
	}

});
