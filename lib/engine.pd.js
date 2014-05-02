var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	config = require('./config');


app.on('sockets ready', function(state, type){

	app.on('pd init', function(){

		state.get(['engine', 'pd'], function(pd){

			if (!!pd) return;

			config.set(require('./engine.pd.json'));

			config.toArray('engine pd options flags path'.split(' '));
			config.toArray('type engine pd options encoding values'.split(' '));
			config.toArray('type engine pd options flags r values'.split(' '));

			config.prefix(['engine', 'pd', 'options', 'flags', 'path'], app.config.dirname);

			type.merge({
				'engine': app.config.type.engine
			});

			state.merge({
				'engine': {
					'pd': app.config.engine.pd
				}
			});

		});

	});

	//app.state.on('change(engine pd process)', function(value){});
	state.on('set', function(path, value){
		if (Array.isArray(path) && path.join(' ') == 'engine pd process'){
			if (value) app.emit('pd create');
			else app.emit('pd destroy');
		}
	});

	app.on('pd create', function(){

		var pd = new port(app.config.engine.pd.options);

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

		// [netsend]
		pd.on('data', function(buffer){
			console.log('[netsend]', buffer.toString());
		});

		pd.on('stderr', function(buffer){
			console.log('pd:', buffer.toString().trim());
		});

		pd.on('exit', function(had_error){
			console.log(had_error ? 'Error: pd crash!' : 'pd quit');
			state.set(['engine', 'pd', 'process'], false);
			state.set(['engine', 'pd', 'dsp'], false);
		});

		pd.on('connect', function(socket){

			socket.on('set', function(path, value){
				path.push(value);
				pd.write(fudi.fromObject({'radio': path}));
			})
			.on('merge', set);
	//		.get(set);

	//		pd.write('space set 0 blib~;\n');

		});

		app.once('exit', function(){
			pd.destroy();
		});

		app.once('pd destroy', function(){
			pd.destroy();
		});

		pd.create();
	});

});

