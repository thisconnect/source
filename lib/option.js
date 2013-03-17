var app = require('./app'),
	argv = require('optimist').argv,
	merge = require('planet/lib/util').merge;

var options = module.exports = {};

var modifiers = {};

app.on('option get', function(option, callback){
	if (typeof callback == 'function') callback(options[option]);
});

app.on('option set', function(option){
	for (var o in option){
		options[o] = option[o];
	}
	merge(options, argv);
});

app.on('argv modify', function(modifiers){
	for (var m in modifiers){
		if (!!argv[m]) modifiers[m](options[m], argv[m]);
	}
});
