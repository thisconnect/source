var app = require('./lib/app');

require('./lib/monitor');
require('./lib/option');
require('./lib/planet');
require('./lib/pd');
require('./lib/server');
require('./lib/desktop');
require('./lib/interface');

app.emit('option set', {'dirname': __dirname});

app.emit('setup');
