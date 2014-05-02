new Unit({

	bound: {},

	initSetup: function(){
		this.subscribe({
			'types ready': this.setTypes,
			'widget create': this.create
		});
		this.bound = {
			publish: this.publish.bind(this),
			subscribe: this.subscribe.bind(this),
			unsubscribe: this.unsubscribe.bind(this)
		};
	},

	types: {},

	setTypes: function(types){
		this.types = types;
	},

	create: function(context, name){

		var types = this.types,
			widget = new Widget(name, types[name]),
			bound = this.bound;

		var id = context + ' ' + name;

		function addControl(type, key, value){

			if (typeof value == 'object' && !Array.isArray(value)){
				widget.addTitle(Array.isArray(key) ? key.getLast() : key);
				for (var k in value){
					addControl(type[k], [key, k], value[k]);
				}
			} else {
				if (Array.isArray(value)) return;
				
				var path = [name, key].flatten();
				console.log(name, 'addControl', [key].flatten().join('.'));

				widget.addControl(type, [key].flatten(), value)
					.addEvent('change', function(value){
						// console.log('set', [path, value]);
						bound.publish(context + ' set', [path, value]);
					});
			}
		}

		function set(path, value){
			// console.log(name, 'set', path.join(' '), value);
			widget.controls[path.join(' ')].set(value);
		}

		function merge(data){
			Object.forEach(data, function(value, key){
				if (!widget.controls[key]) addControl(types[name][key], key, value);
				// widget.controls[key].fireEvent('set', value);
			});
		}

		function destroy(){
			bound.unsubscribe(id + ' set', set);
			bound.unsubscribe(id + ' merge', merge);
			bound.unsubscribe(id + ' delete', destroy);
			widget.fireEvent('destroy');
		}

		bound.subscribe(id + ' set', set);
		bound.subscribe(id + ' merge', merge);
		bound.subscribe(id + ' delete', destroy);

		widget.addEvent('remove', function(){
			bound.publish(context + ' remove', name);
		});

		bound.publish(context + ' add', widget);
	}

});
