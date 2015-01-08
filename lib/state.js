'use strict';

var Event = require('events').EventEmitter;

var app = require('./app'),
    config = require('./config');


config.set({
    'state': {},
    'schema': {}
});

var state = module.exports = new Event();

state.setMaxListeners(20);

app.on('local state', function(socket){

    socket.on('remove', function(key){
        if (typeof key != 'string') key = key.join(' ');
        // console.log('remove(' + key + ')');
        state.emit('remove(' + key + ')', socket);
    });

    socket.on('set', function(path, value){
        if (typeof path != 'string') path = path.join(' ');
        // console.log('change(' + path + ')', value);
        state.emit('change(' + path + ')', socket, value);
    });

    socket.get(function(values){
        if (!Object.keys(values).length) socket.merge(config.options.state);
        app.emit('state', socket);
    });

});


app.on('local schema', function(socket){

    socket.get(function(values){
        if (!Object.keys(values).length) socket.merge(config.options.schema);
        app.emit('schema', socket);
    });

});
