var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	config = require('./config');


config.set({
	'engine': {
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
	}
});

config.toArray(['pd', 'flags', 'path']);

config.prefix(['pd', 'flags', 'path'], app.config.dirname);

config.prefix(['pd', 'flags'], '-');


app.on('type ready', function(type){
	//console.log(type);
});

app.on('sockets ready', function(socket, type){

	app.on('pd init', function(){

		config.set({
			'type': {
				'engine': {
					'process': {
						'type': 'bool'
						, 'label': 'Spawn'
					}
					, 'dsp': {
						'type': 'bool'
						, 'label': 'DSP'
					}
				}
			}
			, 'state': {
				'engine': {
					'process': false
					, 'dsp': false
				}
			}
		});


		type.get(function(data){
			console.log('type', data);
		});

		//type.set('engine', app.config.type.engine);
		socket.merge(app.config.state);

		socket.get(function(state){
			// console.log('state', state);
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

	var pd = new port(app.config.pd);

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

