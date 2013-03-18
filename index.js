var app = require('./lib/app');

require('./lib/monitor');
require('./lib/option');
require('./lib/planet');
require('./lib/pd');
require('./lib/server');
require('./lib/interface');
require('./lib/desktop');

app.emit('option set', {'dirname': __dirname});

app.emit('setup');
