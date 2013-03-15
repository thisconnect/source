var Event = require('events').EventEmitter,
	has = Object.prototype.hasOwnProperty;

module.exports = new Event();
module.exports.setMaxListeners(20);

var actions = {};

module.exports.get = function(serivce){
	if (!has.call(actions, serivce)) actions[serivce] = new Event();
	return actions[serivce];
};

module.exports.hasOption = function(options){
	return function(flag){
		return -1 != options.indexOf(flag);
	};
}(process.argv.slice(2));
