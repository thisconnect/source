new Unit({

	initSetup: function(){
		this.subscribe({
			'descriptor add': this.onAddDescriptor,
			'widget select': this.onSelect,
			'widget create': this.onCreate,
			'planet remove': this.onRemove,
			'tools add': this.onAddTool
		});
	},

	readySetup: function(){},

	widgets: {},

	onAddDescriptor: function(data){
		this.widgets[data.name] = data;
	},

	counter: 0,

	onSelect: function(name){
		var data = {},
			dest = data[this.counter] = {};

		dest[name] = this.widgets[name]['payload'];
		this.publish('merge', data);
	},

	state: {},

	content: document.id('content'),

	onCreate: function(pos, data){
		for (var widget in data){
			this.addWidget(widget, pos, data);
		}
	},

	addWidget: function(widget, pos, data){
		this.state[pos] = new Widget(pos, this.widgets[widget]).attach(this.content);
		for (var control in data[widget]){
			this.publish('planet update ' + [pos, widget, control].join(' '),
				data[widget][control]
			);
		}
		if (this.counter <= pos) this.counter = pos + 1;
	},

	onRemove: function(key){
		this.state[key].destroy();
		delete this.state[key];
		// TODO
		this.publish('set', 'delete ' + key + ';\n'); // ???
	},

	tools: document.id('tools'),

	onAddTool: function(){
		this.tools.adopt(arguments).appendText(' ');
	}

});
