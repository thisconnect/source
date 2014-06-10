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

		if (true) this.add(widget, path, data);

		this.attach(data.element);
	},

	list: null,

	setup: function(key, data, widget){
		var schema = data.schema || {};

		this.element = new Element('div.array');

		new Element('span', {
			'text': schema.title || key
		}).inject(this.element);

		this.list = new Element('ul').inject(this.element);

		this.create(key, data, widget);
	},

	add: function(widget, path, data){
		var list = this.list,
			focus;

		widget.addEvent(path.slice(1).join(' '), function(change){
			var control;
			if (data.value[change.key] == null){

				data.value[change.key] = change.value;

				control = widget.addControl(change.key, {
					'schema': data.schema.items || {}
					, 'element': list
					, 'path': path.concat(change.key)
					, 'array': true
					, 'value': change.value
				});
				if (focus){
					control.focus();
					focus = false;
				}
			}
		});

		function add(){
			var at = path.slice(0);
			at.push(data.value.length);
			focus = true;
			widget.fireEvent('set', [at, data.schema.items.default]);
		}
/*		function add(){
			widget.fireEvent('get', [path, function(array){
				var at = path.slice(0);
				at.push(array.length);
				widget.fireEvent('set', [at, data.schema.items.default]);
			}]);
		}*/

		new Element('span.button[tabindex=0][text="+"]')
			.addEvent('click', add)
			.addEvent('keydown:keys(enter)', add)
			.inject(this.element);
	}

});
