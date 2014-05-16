new Unit({

	initSetup: function(){
		this.subscribe({
			'socket connect': this.addDataSocket,
			'types connect': this.addConfigSocket,
			'socket disconnect': this.destroy
		});
	},

	element: new Element('section.widget'),

	elements: {
		display: new Element('pre')
		, dataButton: new Element('span[tabindex=0][text=data].button')
		, configButton: new Element('span[tabindex=0][text=config].button')
		, perfButton: new Element('span[tabindex=0][text=performance].button')
	},

	data: null,

	addDataSocket: function(data){
		var get = this.get.bind(this, data);
		this.data = data;

		this.elements.dataButton
			.addEvent('click', get)
			.addEvent('keydown:keys(enter)', get)
			.inject(this.element);

		this.element.appendText(' ');
		this.then();
	},

	config: null,

	addConfigSocket: function(config){
		var get = this.get.bind(this, config);
		this.config = config;

		this.elements.configButton
			.addEvent('click', get)
			.addEvent('keydown:keys(enter)', get)
			.inject(this.element);

		this.element.appendText(' ');
		this.then();
	},

	then: function(){
		if (!!this.data && !!this.config){
			this.elements.perfButton.inject(this.element).addEvent('click', this.getPerf.bind(this));
			this.elements.display.set('text', '').inject(this.element);
			this.element.inject(document.body);
		}
	},

	destroy: function(){
		this.elements.dataButton.removeEvents();
		this.elements.configButton.removeEvents();
		this.element.dispose();
	},

	get: function(socket){
		socket.emit('get', this.onGet.bind(this));
	},

	onGet: function(data){
		this.elements.display.set('text', JSON.stringify(data, null, '\r    '));
	},

	getPerf: function(){
		this.onGet(window.performance.getEntries());
	}

});
