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
				, 'value': change.value
			});
			//.set(change.value)

			function merge(values, path){
				for (var key in values){
					if (!values.hasOwnProperty(key)) continue;

					var keys = (path || []).concat(key);
					if (typeof values[key] == 'object'){
						merge(values[key], keys);
					} else {
						widget.fireEvent(keys.join(' '), values[key]);
					}
				}
			}

			if (!!change.value.$type) merge(change.value, [change.key]);

			if (this.focus){
				control.focus();
				this.focus = false;
			}
		}
	},

	onAdd: function add(widget, path, data){
		var at = path.slice(0),
			value;

		at.push(data.value.length);

		if (!!data.schema.items.anyOf){
			value = widget.getDefault(this.picker.get('value'));
		} else {
			this.focus = true;
			value = (this.schema.items.default != null ? this.schema.items.default
				: (this.schema.items.type == 'string' ? ''
				: (this.schema.items.type == 'boolean' ? false
				: 0 )));
		}

		widget.fireEvent('set', [at, value]);
	},

	picker: null,

	add: function(widget, path, data){
		var schema = this.schema = data.schema || {};

		if (!!schema.items.anyOf){
			this.picker = new Element('select').adopt(schema.items.anyOf.map(function(item){
				var name = item.$ref.match(/([^/]+$)/)[1];
				return new Element('option', {text: name, value: item.$ref});
			})).inject(this.element);
		}

		widget.addEvent(path.slice(1).join(' '), this.onChange.bind(this, widget, path, data));

		new Element('span.button[tabindex=0][text="＋"]')
			.addEvent('click', this.onAdd.bind(this, widget, path, data))
			.addEvent('keydown:keys(enter)', this.onAdd.bind(this, widget, path, data))
			.inject(this.element);
	}

});
