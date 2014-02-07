var argv = require('optimist').argv,
	merge = require('tool').merge,
	get = require('tool').get,
	set = require('tool').set;


var options = exports.options = {};


exports.set = function(option){
	for (var o in option){
		options[o] = option[o];
		if (argv[o] == null) continue;
		if (typeof argv[o] == 'object') merge(options[o], argv[o]);
		else options[o] = argv[o];
	}
};

// exports.get

exports.toArray = function(path){
	var o = get(options, path);
	if (typeof o == 'string') set(options, path, o.split(','));
};

exports.prefix = function(path, prefix){
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
};

exports.dashToSpace = function(path){
	var o = get(options, path);
	for (var p in o){
		if (!/-/.test(p)) continue;
		o[p.replace(/-/g, ' ')] = o[p];
		delete o[p];
	}
};
