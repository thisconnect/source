var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	config = require('./config'),
	data = require('./engine.pd.json');


app.on('sockets ready', function(state, type){

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

	state.on('remove', function(key){
		// app.state.on('remove(engine)', function(state, value){});
		if (key == 'engine') app.emit('pd destroy');
	});

	state.on('set', function set(path, value){
		// app.state.on('change(engine pd process)', function(state, value){});
		if (Array.isArray(path) && path.join(' ') == 'engine pd process'){
			app.emit(value ? 'pd create' : 'pd destroy');
		}
	});

	function setDSP(path, value){
		// app.state.on('change(engine pd dsp)', function(state, value){});
		if (Array.isArray(path) && path.join(' ') == 'engine pd dsp'){
			pd.write('dsp ' + (value ? 1 : 0) + ';\n');
		}
	}

	app.once('exit', function(){
		app.emit('pd destroy');
	});

	app.on('pd create', function(){

		var options = app.config.pd.options;

		state.on('set', setDSP);

		app.once('pd destroy', function(){
			state.removeListener('set', setDSP);
			pd.destroy();
		});

		pd.setOptions({
			'pd': options.pd
			, 'encoding': options.encoding
			, 'read': options.read
			, 'write': options.write
			, 'flags': app.config.pd.flags
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

			config.toArray(['pd', 'flags', 'path']);
			config.toArray(['type', 'pd', 'options', 'encoding', 'values']);
			config.toArray(['type', 'pd', 'flags', 'r', 'values']);

			config.prefix(['pd', 'flags', 'path'], app.config.dirname);

			type.merge({
				'engine': {
					'properties': {
						'pd': app.config.type.pd
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

