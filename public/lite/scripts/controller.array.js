/* global Controller */

Controller.array = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);

		this.setup(key, data, widget);

		widget.build({
			'schema': data.schema || {}
			, 'element': this.list
			, 'path': path
			, 'array': true
		}, data.value);

		if (data.schema.items) this.add(widget, path, data);

		this.attach(data.element);
	},

	list: null,

	setup: function(key, data, widget){
		var schema = data.schema || {},
			items = schema.items || {};

		this.element = new Element('div.array');

		if (!!schema.title) new Element('h2.title', {
			'text': schema.title
		}).inject(this.element);

		this.list = new Element('ul').inject(this.element);

		if (items.vertical) this.list.addClass('vertical');
		if (items.type) this.list.addClass(items.type);

		this.create(key, data, widget);
	},

	focus: false,
	schema: {},

	onChange: function(widget, path, data, change){
		var control;
		if (data.value[change.key] == null){

			data.value[change.key] = change.value;

			control = widget.addControl(change.key, {
				'schema': this.schema.items
				, 'element': this.list
				, 'path': path
				, 'array': true
				// , 'value': change.value
			});
			//.set(change.value)

			if (this.focus){
				control.focus();
				this.focus = false;
			}
		}
	},

	onAdd: function add(widget, path, data){
		var at = path.slice(0),
			value = (this.schema.items.default != null ? this.schema.items.default
				: (this.schema.items.type == 'string' ? ''
				: (this.schema.items.type == 'boolean' ? false
				: 0 )));

		at.push(data.value.length);
		this.focus = true;
		widget.fireEvent('set', [at, value]);
	},

	add: function(widget, path, data){
		this.schema = data.schema || {};

		if (!!data.schema.items.anyOf){
			console.log('*******', path.join('.'), JSON.stringify(data.schema.items.anyOf));
		}

		widget.addEvent(path.slice(1).join(' '), this.onChange.bind(this, widget, path, data));

		new Element('span.button[tabindex=0][text="+"]')
			.addEvent('click', this.onAdd.bind(this, widget, path, data))
			.addEvent('keydown:keys(enter)', this.onAdd.bind(this, widget, path, data))
			.inject(this.element);
	}

});
