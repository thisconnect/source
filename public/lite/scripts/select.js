new Unit({

	initSetup: function(){
		this.subscribe('descriptor add', this.parse);
	},

	element: new Element('select.span12'),

	dispatcher: new Element('button.btn.btn-primary', {
		text: 'create',
		title: 'add a new element'
	}),

	readySetup: function(){
		this.publish('tools add',
			new Element('div.control-group.well')
				.grab(this.element)
				.appendText(' ')
				.grab(this.dispatcher)
		);
		this.dispatcher.addEvent('click', this.onSelect.bind(this));
	},

	parse: function(data){
		new Element('option', {
			value: data.name,
			text: data.label
		}).inject(this.element, 'bottom');
	},

	onSelect: function(e){
		e.preventDefault();
		this.publish('widget select', this.element.value);
	}

});
