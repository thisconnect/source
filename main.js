var app = require('./lib/app');

require('./lib/log');
require('./lib/server');
require('./lib/socket');
require('./lib/engine');
require('./lib/interface');
require('./lib/desktop');

app.emit('setup');
