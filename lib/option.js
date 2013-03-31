var app = require('./app'),
	argv = require('optimist').argv,
	merge = require('planet/lib/util').merge;

var options = module.exports = {};

app.on('option set', function(option){
	for (var o in option){
		options[o] = option[o];
	}
	merge(options, argv);
});

app.on('setup', function(){
	app.emit('option ready', options);
});
