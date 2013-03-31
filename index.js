var app = require('./lib/app');

require('./lib/monitor');
require('./lib/option');

app.emit('option set', {'dirname': __dirname + '/'});

require('./lib/socket');
require('./lib/pd');
require('./lib/server');
require('./lib/interface');
require('./lib/desktop');

app.emit('setup');
