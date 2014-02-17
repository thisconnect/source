var app = require('./lib/app');

require('./lib/log');
require('./lib/engine');
// require('./lib/pd');
require('./lib/server');
require('./lib/socket');
require('./lib/interface');
require('./lib/desktop');

app.emit('setup');
