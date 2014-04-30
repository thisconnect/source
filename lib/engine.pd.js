var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	config = require('./config');


app.on('sockets ready', function(state, type){

	app.on('pd init', function(){

		config.set({
			'engine': {
				'pd': {
					'options': {
						'read': 8005
						, 'write': 8006
						, 'encode': 'ascii'
						, 'flags': {
							'nogui': false
							//, 'r': 44100
							//, 'listdev': false
							//, 'noprefs': true // supperss loading ".pdrc"
							//, 'nomidi': true
							//, 'noautopatch': false
							, 'stderr': true
							//, 'batch': false
							, 'path': ['pd', 'pd/blib']
							//, 'send': 'netsend send ready;'
							, 'open': './manager.pd'
						}
					}
					, 'process': false
					, 'dsp': false
				}
			}
			, 'type': {
				'engine': {
					'pd': {
						'options': {
							'flags': {
								'r': {
									'label': 'sample rate'
									, 'type': 'enum'
									, 'values': [44100, 22050]
								}
								, 'nomidi': {
									'desc': 'suppress MIDI input and output'
								}
								, 'listdev': {
									'desc': 'list audio and MIDI devices'
								}
								, 'nogui': {
									'desc': 'suppress starting the GUI'
								}
							}
						}
						, 'process': {
							'label': 'Spawn'
						}
						, 'dsp': {
							'label': 'Compute Audio'
						}
					}
				}
			}
		});

		config.toArray(['engine', 'pd', 'options', 'flags', 'path']);
		config.toArray('type engine pd options flags r value'.split(' '));

		config.prefix(['engine', 'pd', 'options', 'flags', 'path'], app.config.dirname);

		config.prefix(['engine', 'pd', 'options', 'flags'], '-');

		type.merge({
			'engine': app.config.type.engine
		});

		state.merge({
			'engine': {
				'pd': app.config.engine.pd
			}
		});

		//app.state.on('change(engine pd process)', function(value){});
		state.on('set', function(path, value){
			if (path.join(' ') == 'engine pd process'){
				if (value) app.emit('pd create');
				else app.emit('pd destroy');
			}
		});

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

