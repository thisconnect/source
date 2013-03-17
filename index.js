var app = require('./lib/app');

require('./lib/monitor');
require('./lib/ui');
require('./lib/desktop');
require('./lib/planet');
require('./lib/pd');
require('./lib/server');
require('./lib/option');

app.on('option setup', function(){
	app.emit('option set', 'dirname', __dirname);
});

app.emit('setup');
