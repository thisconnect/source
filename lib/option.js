var app = require('./app');

var options = module.exports = {},
	parse = {};

app.on('option get', function(option, callback){
	if (typeof callback == 'function') callback(options[option]);
});

app.on('option set', function(option, value){
	options[option] = value;
});

app.on('option parse', function(option, callback){
	parse[option] = callback;
});

function split(string){
	if (typeof string != 'string'
		|| string.indexOf(',') == -1
	) return string;
	return string.split(',');
}

app.on('setup', function(){

	var argv = require('optimist').argv;

	for (var p in argv){
		var a = p in parse ? parse[p](argv[p]) : argv[p];
		if (typeof a == 'object'
			&& typeof options[p] == 'object'
		){
			for (var pp in a){
				options[p][pp] = split(a[pp]);
			}
		} else options[p] = split(a);
	}
	console.log(options);

});