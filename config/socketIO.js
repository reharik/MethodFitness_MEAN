'use strict';

var  passportSocketIo = require('passport.socketio'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    config = require('./config.js'),
    path = require('path'),
    cookieParser = require('cookie-parser');

module.exports = function(server, db) {
    var io = require('socket.io').listen(server);

    var sessionStore = new mongoStore({
        db: db.connection.db,
        collection: config.sessionCollection,
        auto_reconnect: true
    });

    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key:         'express.sid',       // the name of the cookie where express/connect stores its session_id
        secret:      config.sessionSecret,    // the session_secret to parse the cookie
        store:       sessionStore,        // we NEED to use a sessionstore. no memorystore please
        success:     function(data, accept){
            console.log('successful connection to socket.io');
//            accept(null, true);
            accept();
        },  // *optional* callback on success - read more below
        fail:        function(data, message, error, accept){
            if(error){ throw new Error(message); }
            console.log('failed connection to socket.io:', message);
            accept(null, false);
            if(error){ accept(new Error(message)); }
        }
    }));


    io.sockets.on('connection', function (socket) {
        var _socket = socket;
        var user = _socket.client.request.user;
        console.log(user.email + ' connected');
        var allRooms = Object.keys(io.sockets.adapter.rooms);
        _socket.join(user.email);

        config.getGlobbedFiles('./app/controllers/**/*.js').forEach(function(modelPath) {
            var controller = require(path.resolve(modelPath));
            if(typeof controller.respond === 'function'){
                controller.respond(user.email,_socket,io);
            }
        });
        socket.on('disconnect', function() {
            console.log(user.email+' leaving room');
            _socket.leave(user.email);

        });
    });


};