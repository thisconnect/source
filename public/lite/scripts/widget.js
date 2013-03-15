var Widget = new Class({

	Implements: Unit,

	initialize: function(id, data){
		this.setupUnit();
		this.id = id;
		this.label = data.label;
		this.description = data.description;
		this.name = data.name;

		this.build();
		this.buildControllers(data.controllers);
	},

	build: function(){
		var that = this;
		this.element = new Element('section');
		new Element('h1', {
			text: this.label,
			events: {
				click: function(){ that.form.toggleClass('hidden'); }
			}
		}).adopt([
			(!this.description) ? null : new Element('small', {
				text: ' ' + this.description + ' '
			}),
			new Element('button.close[text=⨯]', {
				title: 'destroy ' + this.label + ' (' + this.id + ')',
				events: {
					click: this.onRemove.bind(this)
				}
			})
		]).inject(this.element);
		/*
		this.element.set('html', '<h1>{label}{description}{close}</h1>'.substitute({
			label: this.label,
			description: this.description ? '<small> ' + this.description + ' </small>' : '',
			close: '<button class="close" title="destroy">⨯</button>'
		}));
		*/

		this.form = new Element('form.form-horizontal').inject(this.element);
	},

	buildControllers: function(controls){
		for (var name in controls){
			if (!controls.hasOwnProperty(name)) continue;
			this.addController([this.id, this.name, name], controls[name]);
		};
	},

	addController: function(path, controller){
		var that = this,
			control = new Controller(controller.type, controller);

		control.addEvent('quickchange', function(value){
			that.publish('widget update', [path, value]);
		});
		var bound = {
			update: this.onUpdate.bind(control)
		};
		this.subscribe('planet update ' + path.join(' '), bound.update);
		control.attach(this.form);
		return control;
	},

	attach: function(element, position){
		this.element.inject(element || document.body, position || 'bottom');
		return this;
	},

	detach: function(){
		this.element.dispose();
		return this;
	},

	onRemove: function(){
		this.publish('widget remove', this.id);
	},

	destroy: function(){
		this.element.destroy();
	},

	onUpdate: function(value){
		this.set(value);
	}

});
