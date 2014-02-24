var app = require('./lib/app');

require('./lib/log');
// require('./lib/pd');
require('./lib/server');
require('./lib/socket');
require('./lib/local');
require('./lib/engine');
require('./lib/interface');
require('./lib/desktop');
require('./lib/state');

app.emit('setup');
