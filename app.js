var app = require('./lib/app');

require('./lib/log');
require('./lib/server');
require('./lib/interface');
require('./lib/socket');
require('./lib/engine');

require('./lib/desktop');
require('./lib/test');

app.emit('setup');
