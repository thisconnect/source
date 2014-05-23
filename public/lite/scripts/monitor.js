new Unit({

	initSetup: function(){
		this.subscribe({
			'socket connect': this.addDataSocket,
			'socket disconnect': this.destroy,
			'schema connect': this.addSchemaSocket,
			'schema ready': this.addSchema
		});
	},

	readySetup: function(){
		this.elements.resButton.inject(this.element).addEvent('click', this.getRes.bind(this));
		this.element.appendText(' ');
		this.elements.display.set('text', '').inject(this.element);
		this.element.inject(document.body);
	},

	element: new Element('section.widget'),

	elements: {
		display: new Element('pre')
		, dataButton: new Element('span[tabindex=0][text=State].button')
		, schemaButton: new Element('span[tabindex=0][text=Schema].button')
		, localSchemaButton: new Element('span[tabindex=0][text="Local Schema"].button')
		, resButton: new Element('span[tabindex=0][text=Resources].button')
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
		this.elements.display.set('text', '').inject(this.element);
	},

	schemaSocket: null,

	addSchemaSocket: function(socket){
		var get = this.get.bind(this, socket);
		this.schemaSocket = socket;

		this.elements.schemaButton
			.addEvent('click', get)
			.addEvent('keydown:keys(enter)', get)
			.inject(this.element);

		this.element.appendText(' ');
		this.elements.display.set('text', '').inject(this.element);
	},

	addSchema: function(schema){
		var setText = this.onGet.bind(this, schema);
		this.elements.localSchemaButton
			.addEvent('click', setText)
			.addEvent('keydown:keys(enter)', setText)
			.inject(this.element);

		this.elements.display.set('text', '').inject(this.element);
	},

	destroy: function(){
		this.elements.dataButton.removeEvents();
		this.elements.schemaButton.removeEvents();
		this.elements.localSchemaButton.removeEvents();
		this.element.dispose();
	},

	get: function(socket){
		socket.emit('get', this.onGet.bind(this));
	},

	onGet: function(data){
		this.elements.display.set('text', JSON.stringify(data, null, '\r    '));
	},

	getRes: function(){
		this.onGet(window.performance.getEntries());
	}

});
