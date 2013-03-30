var app = require('./app'),
	argv = require('optimist').argv,
	merge = require('planet/lib/util').merge;

var modifiers = {},
	options = module.exports = {};

app.on('option set', function(option){
	for (var o in option){
		options[o] = option[o];
	}
	merge(options, argv);
});

app.on('argv modify', function(modifiers){
	for (var m in modifiers){
		if (!(m in argv)) continue;
		modifiers[m](options[m], argv[m]);
		modifiers[m](argv[m], argv[m]);
	}
});

app.on('setup', function(){
	app.emit('option ready', options);
});
