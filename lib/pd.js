var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	o = require('./option');

app.emit('option set', {
	'pd': {
		'read': 8005
		, 'write': 8006
		, 'flags': {
			'noprefs': true
			, 'nogui': false
			, 'stderr': true
			, 'path': ['pd', 'pd/blib']
			//, 'send': 'netsend send ready;'
			, 'open': './manager.pd'
		}
	}
});

app.on('option ready', function(options){
	var object = o.pd.flags,
		array = o.pd.flags = [];

	for (var f in object){
		if (/path|open/.test(f) || !object[f]) continue;
		if (typeof object[f] == 'boolean') array.push('-' + f);
		else array.push('-' + f, object[f]);
	}

	if (typeof object.path == 'string') object.path = object.path.split(',');

	for (var i = 0, l = object.path.length; i < l; ++i){
		array.push('-path', o.dirname + object.path[i]);
	}
	array.push('-open', object.open);
});


app.on('server setup', function(){
	app.emit('server add static', '/instruments', '/pd/blib');
});

app.on('socket system', function(socket){
	this.emit('merge', {
		'pd': require('./pd.json')
	});
});


app.on('socket', function(planet){

	var pd = port(o.pd);

	app.on('exit', function(){
		pd.destroy();
	});

	planet.on('connect', function(){
		planet.emit('get', function(data){
//			console.log('get', data);
		});
	});

	planet.on('listening', function(){
		if (planet.get) planet.get(function(data){
//			console.log('get', data);
		});
	});

	// [netsend]
	pd.on('data', function(buffer){
		console.log('[netsend]', buffer.toString()); // == 'ready;\n'
	});

	pd.on('stderr', function(buffer){
		console.log('pd:', buffer.toString().trim());
	});

	function set(data){console.log(1111111);
		var pos = Object.keys(data),
			p = pos.length,
			bag = [],
			inst, i;

		while (p--){
			inst = Object.keys(data[pos[p]]);
			i = inst.length;

			while (i--){
				pd.write('space set ' + pos[p] + ' ' + inst[i] + ';\n');
			}
			bag.push(data[pos[p]]);
		}

		pd.write(fudi.fromObject({'radio': bag}));
	}

	pd.on('connect', function(socket){

		planet.on('set', function(path, value){
			path.push(value);
			pd.write(fudi.fromObject({'radio': path}));
		})
		.on('merge', set);
//		.get(set);

//		pd.write('space set 0 blib~;\n');

	});

	pd.on('exit', function(had_error){
		//services.emit('set', 'dsp', false);
		console.log(had_error ? 'Error: pd crash!' : 'pd quit');
	});

	pd.create();

});

