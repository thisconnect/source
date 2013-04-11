var app = require('./app'),
	argv = require('optimist').argv,
	merge = require('planet/lib/util').merge; // TODO

var options = module.exports = {};

app.on('option set', function(option){
	for (var o in option){
		options[o] = option[o];
	}
	merge(options, argv);
});

app.on('option get', function(fn){
	fn(options);
});

app.on('setup', function(){
	app.emit('option setup');
	app.emit('option ready', options);
});
