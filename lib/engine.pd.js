var port = require('port'),
	fudi = require('fudi');

var app = require('./app'),
	config = require('./config');


app.on('sockets ready', function(state, type){

	app.on('pd init', function(){

		config.set({
			'engine': {
				'pd': {
					'process': false
					, 'dsp': false
					, 'options': {
						'read': 8005
						, 'write': 8006
						, 'flags': {
							'r': 44100
							, 'listdev': false
							//, 'noprefs': true // supperss loading ".pdrc"
							, 'nomidi': true
							, 'nogui': false
							//, 'noautopatch': false
							, 'stderr': true
							//, 'n': false // supperss "print:" in output
							//, 'batch': false
							, 'path': ['pd', 'pd/blib']
							//, 'send': 'netsend send ready;'
							, 'open': './manager.pd'
						}
					}
				}
			}
			, 'type': {
				'engine': {
					'pd': {
						'process': {
							'label': 'Spawn'
						}
						, 'dsp': {
							'label': 'Compute Audio'
						}
						, 'options': {
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
					}
				}
			}
		});

		config.toArray(['pd', 'flags', 'path']);
		config.toArray('type engine pd options flags r value'.split(' '));

		config.prefix(['pd', 'flags', 'path'], app.config.dirname);

		config.prefix(['pd', 'flags'], '-');

		type.merge({
			'engine': app.config.type.engine
		});
		
		state.merge({
			'engine': {
				'pd': app.config.engine.pd
			}
		});

		state.get(function(state){
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

