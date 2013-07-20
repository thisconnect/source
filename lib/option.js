var app = require('./app'),
	argv = require('optimist').argv,
	merge = require('planet/lib/util').merge,
	get = require('planet/lib/util').get,
	set = require('planet/lib/util').set; // TODO


var options = module.exports = {};

app.on('option set', function(option){
	for (var o in option){
		options[o] = option[o];
	}
	merge(options, argv);
});

/* app.on('option get', function(fn){
	fn(options);
}); */

app.on('option to array', function(path){
	var o = get(options, path);
	if (typeof o == 'string') set(options, path, o.split(','));
});

app.on('option prefix', function(path, prefix){
	var o = get(options, path);
	if (Array.isArray(o)){
		for (var i = 0, l = o.length; i < l; ++i){
			o[i] = prefix + o[i];
		}
	} else {
		for (var p in o){
			o[prefix + p] = o[p];
			delete o[p];
		}
	}
});

app.on('option dash to space', function(path){
	var o = get(options, path);
	for (var p in o){
		if (!/-/.test(p)) continue;
		o[p.replace(/-/g, ' ')] = o[p];
		delete o[p];
	}
});

app.on('setup', function(){
	app.emit('option setup');
	app.emit('option parse', options);
});
