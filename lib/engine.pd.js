'use strict';

var Port = require('port');

var app = require('./app'),
	state = require('./state'),
	config = require('./config');


config.set(require('./engine.pd.json'));

var pd = new Port(config.options.state.pd.options);

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

app.once('exit', function(){
	app.emit('pd destroy');
});

state.on('remove(pd)', function(/*socket*/){
	app.emit('pd destroy');
});

state.on('change(pd process)', function(socket, value){
	app.emit(value ? 'pd create' : 'pd destroy');
});

state.on('change(pd dsp)', function(socket, value){
	if (pd.isRunning()) pd.write('dsp ' + (value ? 1 : 0) + ';\n');
});

app.on('pd create', function(){

	app.once('pd destroy', function(){
		pd.destroy();
	});

	pd.setOptions(config.options.state.pd.options);

	pd.setOptions({
		'flags': config.options.state.pd.flags
	});

	pd.create();

});

app.on('state', function(socket){

	app.once('pd destroy', function(){
		socket.set(['pd', 'dsp'], false);
		socket.set(['pd', 'process'], false);
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


});
