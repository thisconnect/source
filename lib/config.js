var argv = require('minimist')(process.argv.slice(2)),
	get = require('tool').get;


var options = exports.options = {};

function merge2(o1, o2){
	for (var p in o2) {
		if (Array.isArray(o1[p]) && typeof o2[p] == 'string') o1[p] = o2[p].split(',');
		else o1[p] = (
			o1[p] != null
			&& o2[p] != null
			&& !Array.isArray(o1[p])
			&& !Array.isArray(o2[p])
			&& typeof o1[p] == 'object'
			&& typeof o2[p] == 'object'
		) ? merge2(o1[p], o2[p]) : o2[p];
	}
	return o1;
}

exports.set = function(option){
	var a = JSON.parse(JSON.stringify(argv));
	option = JSON.parse(JSON.stringify(option));

	for (var o in option){
		if (options[o] == null) options[o] = option[o];
		else merge2(options[o], option[o]);

		if (a[o] == null) continue;
		if (typeof a[o] == 'object') merge2(options[o], a[o]);
		else options[o] = a[o];
	}
};

// exports.get

exports.dashToSpace = function(path){
	var o = get(options, path);
	for (var p in o){
		if (!/-/.test(p)) continue;
		o[p.replace(/-/g, ' ')] = o[p];
		delete o[p];
	}
};
