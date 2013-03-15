var app = require('./app');

app.on('server setup', function(){
	app.emit('server add static', '/instruments', '/pd/blib');
});

app.on('socket', function(io){
/*
	if (!app.hasOption('--local')) return;
	var services = io.of('/service');
	services.on('connection', function(socket){
		socket.emit('setup', {
			'dsp': ['on', 'off']
		});
		socket.on('set', function(service, state){
			if (typeof state == 'boolean') state = state ? 1 : 0;
//			pd.write(service + ' ' + state + ';\n');
//			services.emit('set', service, state);
		});

	});
	*/
//		console.log(require('./manifest'));
});

app.on('planet', function(planet){
	var port = require('port'),
		fudi = require('fudi');

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

	var pd = port(app.options.pd);

	app.on('exit', function(){
		pd.destroy();
	});

	// [netsend]
	pd.on('data', function(buffer){
//		console.log('[netsend]', buffer.trim());
	});

	pd.on('stderr', function(buffer){
		console.log('pd:', buffer.toString().trim());
	});

	pd.on('connect', function(socket){

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

		//	pd.write(fudi.fromObject({'radio': bag}));
		}

		planet.on('set', function(path, value){
			path.push(value);
			pd.write(fudi.fromObject({'radio': path}));
		})
		.on('merge', set);
//		.get(set);

	//	pd.write('space set 0 blib~;\n');

	});

	pd.on('exit', function(had_error){
		//services.emit('set', 'dsp', false);
//		console.log(had_error ? 'Error: pd crash!' : 'pd quit');
	});

	pd.create();

});

