var app = require('./app');
var state = require('./state');
var config = require('./config');

config.set({
    'connect': {
        'local': {
            'data': '/local'
        }
        , 'remote': {
            'url': ''
        }
    }
    , 'state': {
        'connect': {
            'remote': ''
            , 'connect': false
            , 'localhost': true
        }
    }
    , 'schema': {
        'connect': {
            'disabled': true
            , 'enable': ['pd', 'process']

        }
    }
});

state.on('change(connect local)', function(socket){

    console.log(this == socket);

});
