new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create,
			'widget destroy': this.destroy,
			'widget merge': this.merge,
			'widget set': this.set
		});
	},

	widgets: {},

	create: function(context, id, data){
		var widget = this.widgets[id]
			|| (this.widgets[id] = new Widget3(id, data));

		this.publish(context + ' add', widget);
	},

	destroy: function(id){
		if (!this.widgets[id]) return;
		this.widgets[id].destroy();
		delete this.widgets[id];
	},

	merge: function(context, id, data){
		console.log('merge --->', context, id, data);
		//console.log(this.widgets[id]);
	},

	set: function(path, value){
		console.log('set --->', path, value);
		//console.log(this.widgets[id]);
	}

});

var Widget3 = new Class({

	Implements: Unit,

	brakets: /(.*?)\[(.*?)\]/,

	initialize: function(id, data){
		this.setupUnit();
		this.create(id, data);
    },

	create: function(id, data){
		this.element = new Element('section');
		Object.forEach(data, this.control.bind(this, id));
	},

	destroy: function(){
		this.element.destroy();
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
		var type = data.type.capitalize(),
			array = type.match(this.brakets),
			publish = this.publish.bind(this),
			control = (!array
				? new Controller[type](data)
				: new Controller.Array(array, data)),
			change = function(value){
				//console.log(id, name, value);
				publish('local set', [[id, name], value]);
			};

		control.addEvent('quickchange', change).attach(this.element);
		this.subscribe(id + ' change ' + name, function(value){
			console.log(id + ' change ' + name, value);
		});
	}

});
