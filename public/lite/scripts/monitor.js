new Unit({

	initSetup: function(){
		this.subscribe({
			'socket connect': this.create,
			'types connect': this.createConfig,
			'socket disconnect': this.destroy
		});
	},

	element: new Element('section.widget'),

	elements: {
		display: new Element('pre'),
		dataButton: new Element('a[href=#][text=data]'),
		configButton: new Element('a[href][text=config]')
	},

	data: null,

	create: function(data){
		this.data = data;

		this.elements.dataButton
			.addEvent('click', this.get.bind(this, data))
			.inject(this.element, 'top')
			.appendText(' ');

		this.elements.display.set('text', '').inject(this.element);
		this.element.inject(document.body);
	},

	config: null,

	createConfig: function(config){
		this.config = config;

		this.elements.configButton
			.addEvent('click', this.get.bind(this, config))
			.inject(this.element, 'top')
			.appendText(' ');
	},

	destroy: function(){
		this.elements.dataButton.removeEvents();
		this.elements.configButton.removeEvents();
		this.element.dispose();
	},

	get: function(socket, e){
		e.preventDefault();
		socket.emit('get', this.onGet.bind(this));
	},

	onGet: function(data){
		this.elements.display.set('text', JSON.stringify(data, null, '\r\t'));
	}

});
