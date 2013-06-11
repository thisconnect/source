var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	option = require('./option');

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
	var o = option.pd.flags,
		flags = option.pd.flags = [];
	
	// prefix flags
	for (var f in o){
		if (/path|open/.test(f) || !o[f]) continue;
		flags.push('-' + f);
		if (typeof o[f] != 'boolean') flags.push(o[f]);
	}

	// turn path to array
	if (typeof o.path == 'string') o.path = o.path.split(',');

	// prefix with dirname
	for (var i = 0, l = o.path.length; i < l; ++i){
		flags.push('-path', option.dirname + o.path[i]);
	}

	flags.push('-open', o.open);
});


app.on('server setup', function(){
//	app.emit('server add static', '/instruments', '/pd/blib');
});
/*
app.on('state socket', function(planet){
	planet.on('listening', function(){
		planet.merge({
			'pd': {
				'dsp': true
			}
		});
		planet.get(function(state){
			console.log('state', state);
		});
	});
});
*/
app.on('socket', function(planet){

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

});

function set(data){
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

app.on('pd create', function(){

	var pd = new port(option.pd);

	app.on('exit', function(){
		pd.destroy();
	});

	// [netsend]
	pd.on('data', function(buffer){
		console.log('[netsend]', buffer.toString());
	});

	pd.on('stderr', function(buffer){
		console.log('pd:', buffer.toString().trim());
	});

	pd.on('exit', function(had_error){
		console.log(had_error ? 'Error: pd crash!' : 'pd quit');
	});

	pd.on('connect', function(socket){

		planet.on('set', function(path, value){
			path.push(value);
			pd.write(fudi.fromObject({'radio': path}));
		})
		.on('merge', set);
//		.get(set);

//		pd.write('space set 0 blib~;\n');

	});

	pd.create();
});

app.on('pd destroy', function(){
	pd.destroy();
});

