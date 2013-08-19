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
		, 'control': {
			'process': {
				'type': 'bool'
				, 'label': 'Spawn'
			}
			, 'dsp': {
				'type': 'bool'
				, 'label': 'DSP'
			}
		}
		, 'state': {
			'process': false
			, 'dsp': false
		}
	}
});

app.on('option parse', function(options){
	app.emit('option to array', ['pd', 'flags', 'path']);
	app.emit('option prefix', ['pd', 'flags', 'path'], option.dirname);
	app.emit('option prefix', ['pd', 'flags'], '-');
});

app.on('system socket', function(system){
	system.on('set', function(path, data){
		console.log('system', path, data);
	});
	system.merge({
		'pd': option.pd.control
	});
});

app.on('state socket', function(state){
	state.merge({'pd': option.pd.state});
	state.on('set', function(path, data){
		console.log('state', path, data);
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

