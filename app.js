'use strict';

var app = require('./lib/app');

require('./lib/log');
require('./lib/server');
require('./lib/interface');
require('./lib/local');
require('./lib/state');
require('./lib/engine');
require('./lib/connect');

// require('./lib/desktop');
// require('./lib/test');

app.emit('setup');
