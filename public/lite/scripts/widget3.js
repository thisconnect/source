new Unit({

	initSetup: function(){
		this.subscribe({
			'widget create': this.create
		});
	},

	create: function(context, id, data){
		var widget = new Widget3(context, id, data);
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

	element: null,

	create: function(data){
		this.element = new Element('section.widget');

		new Element('span.button.float-right[text=⨯]')
			.addEvent('click', this.destroy.bind(this))
			.inject(this.element);

		new Element('h2', {
			text: this.id.capitalize()
		}).inject(this.element);

		Object.forEach(data, this.addControl.bind(this));

		this.subscribe([this.context, this.id, 'delete'].join(' '), this.destroy);

		this.subscribe([this.context, this.id, 'merge'].join(' '), this.merge);
	},

	destroy: function(){
		this.unsubscribe();
		this.element.destroy();
		Unit.undecorate(this);
	},

	attach: function(element, position){
		this.element.inject(element, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	controls: [],

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
			console.log([this.context, this.id, name, 'set'].join(' '), value);
			control.set(value);
		});

		this.subscribe([this.context, this.id, 'delete'].join(' '), function(){
			console.log([this.context, this.id, name, 'destroy'].join(' '));
			control.destroy();
		});

	},

	merge: function(data){
		for (var key in data){
			this.publish([this.context, this.id, key, 'set'].join(' '), data[key]);
		}
	}

});
