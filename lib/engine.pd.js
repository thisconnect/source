var port = require('port');

var app = require('./app'),
	config = require('./config'),
	data = require('./engine.pd.json');


app.on('sockets ready', function(state, schema){

	var pd = new port(data.pd.options);

	// [netsend]
	pd.on('data', function(buffer){
		console.log('[netsend]', buffer.toString());
	});

	pd.on('stderr', function(buffer){
		console.log('pd:', buffer.toString().trim());
	});

	pd.on('exit', function(had_error){
		console.log(had_error ? 'Error: pd crash!' : 'pd quit');
		state.get(['engine', 'pd'], function(value){
			if (!value) return;
			state.get(['engine', 'pd', 'process'], function(process){
				if (!!process) state.set(['engine', 'pd', 'process'], false);
			});
			state.set(['engine', 'pd', 'dsp'], false);
		});
	});

	app.state.on('remove(engine)', function(/*socket*/){
		app.emit('pd destroy');
	});

	app.state.on('change(engine pd process)', function(socket, value){
		app.emit(value ? 'pd create' : 'pd destroy');
	});

	app.state.on('change(engine pd dsp)', function(socket, value){
		if (pd.isRunning()) pd.write('dsp ' + (value ? 1 : 0) + ';\n');
	});

	app.once('exit', function(){
		app.emit('pd destroy');
	});

	app.on('pd create', function(){

		app.once('pd destroy', function(){
			pd.destroy();
		});

		pd.setOptions(app.config.pd.options);

		pd.setOptions({
			'flags': app.config.pd.flags
		});

		pd.create();

	});

/*
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

	pd.on('connect', function(socket){

		state.on('set', function(path, value){
			console.log('-----------');
			path.push(value);
			pd.write(fudi.fromObject({'radio': path}));
		})
		.on('merge', set);
//		.get(set);

//		pd.write('space set 0 blib~;\n');


	});
*/

	app.on('engine pd init', function(){

		state.get(['engine', 'pd'], function(value){

			if (!!value) return;

			config.set(data);

			schema.merge({
				'engine': {
					'properties': {
						'pd': app.config.schema.pd
					}
				}
			});

			state.merge({
				'engine': {
					'pd': app.config.pd
				}
			});

		});

	});

});
