new Unit({

	pre: new Element('pre'),

	initSetup: function(){
		var pre = this.pre;

		this.subscribe({
			'socket connect': function(){
				pre.appendText('socket connect', 'top');
				pre.appendText('\n', 'top');
			},
			'socket disconnect': function(){
				pre.set('text', '\nsocket disconnect');
			},
			'socket reconnect': function(){
				pre.appendText('socket reconnect', 'top');
				pre.appendText('\n', 'top');
			},
			'system connect': function(system){
				pre.appendText('system connect', 'top');
				pre.appendText('\n', 'top');
				system.emit('get', function(data){
					pre.appendText('system: ' + JSON.stringify(data, null, '\r\t'), 'top');
					pre.appendText('\n', 'top');
				});
			},
			'state connect': function(state){
				state.emit('get', function(data){
					pre.appendText('state: ' + JSON.stringify(data, null, '\r\t'), 'top');
					pre.appendText('\n', 'top');
				});
			},
			'state set': function(path, value){
				path = path.slice(0);
				path.push(value);
				pre.appendText('\n' + path.join(' '), 'top');
			}
		});

	},

	readySetup: function(){
		this.pre.inject(document.body);
	}

});
