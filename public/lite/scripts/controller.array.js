Controller.array = new Class({

	Extends: Controller,

	initialize: function(key, data, widget){
		var path = data.path.concat(key);
		console.log('array', path.join('.'));

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

	add: function(widget, path, data){
		var list = this.list,
			items = data.schema.items || {},
			focus;

		widget.addEvent(path.slice(1).join(' '), function(change){
			var control;
			if (data.value[change.key] == null){

				data.value[change.key] = change.value;

				control = widget.addControl(change.key, {
					'schema': items
					, 'element': list
					, 'path': path
					, 'array': true
					// , 'value': change.value
				})
				//.set(change.value)
				;

				if (focus){
					control.focus();
					focus = false;
				}
			}
		});

		function add(){
			var at = path.slice(0),
				value = (items.default != null ? items.default
					: (items.type == 'string' ? ''
					: (items.type == 'boolean' ? false
					: 0 )));

			at.push(data.value.length);
			focus = true;
			widget.fireEvent('set', [at, value]);
		}

		new Element('span.button[tabindex=0][text="+"]')
			.addEvent('click', add)
			.addEvent('keydown:keys(enter)', add)
			.inject(this.element);
	}

});
