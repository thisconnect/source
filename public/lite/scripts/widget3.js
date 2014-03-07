new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create
		});
	},

	create: function(context, id, data){
		new Widget3(context, id, data);
	},

	destroy: function(id){
		if (!this.widgets[id]) return;
		this.widgets[id].destroy();
		delete this.widgets[id];
	},

	merge: function(context, id, data){
		for (var key in data){
			if (!this.widgets[id]['controllers'][key]) continue;
			this.widgets[id]['controllers'][key].set(data[key]);
		}
	},

	set: function(path, value){
		if (!this.widgets[path[0]]['controllers'][path[1]]) return;
		this.widgets[path[0]]['controllers'][path[1]].set(value);
	}

});

var Widget3 = new Class({

	Implements: Unit,

	brakets: /(.*?)\[(.*?)\]/,
	context: null,
	id: null,

	initialize: function(context, id, data){
		this.setupUnit();
		this.context = context;
		this.id = id;
		this.create(data);
		this.publish(context + ' add', this);
    },

	create: function(data){
		this.element = new Element('section');

		new Element('span.float-right[text=⨯]')
			.addEvent('click', function(){
				console.log('close');
			})
			.inject(this.element);

		new Element('h2', {
			text: this.id.capitalize()
		}).inject(this.element);

		Object.forEach(data, this.addControl.bind(this));

		this.subscribe([this.context, this.id, 'merge'].join(' '), function(data){
			for (var key in data){
				this.publish([this.context, this.id, key, 'set'].join(' '), data[key]);
			}
		});
	},

	destroy: function(){
		this.unsubscribe();
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

	addControl: function(data, name){
		var control,
			that = this,
			type = data.type.capitalize(),
			array = type.match(this.brakets),
			publish = this.publish.bind(this);

		if (!array) control = new Controller[type](data);
		else control = new Controller.Array(array, data);

		control.addEvent('quickchange', function(value){
			publish(that.context + ' set', [[that.id, name], value]);
		}).attach(this.element);

		this.subscribe([this.context, this.id, name, 'set'].join(' '), function(value){
			control.set(value);
		});

	},

	merge: function(id, data){
		for (var key in data){
			if (!this.widgets[id]['controllers'][key]) continue;
			this.widgets[id]['controllers'][key].set(data[key]);
		}
	}

});
