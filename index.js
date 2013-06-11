var app = require('./lib/app');

require('./lib/log');
require('./lib/socket');
require('./lib/pd');
require('./lib/engine');
require('./lib/server');
require('./lib/interface');
require('./lib/desktop');

app.emit('setup');
