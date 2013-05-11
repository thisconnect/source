var app = require('./lib/app');

require('./lib/option');
require('./lib/monitor');
require('./lib/socket');
require('./lib/pd');
require('./lib/server');
require('./lib/interface');
require('./lib/desktop');

app.emit('setup');
