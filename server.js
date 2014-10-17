'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    passportSocketIo = require('passport.socketio'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    path = require('path');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
});

// Init the express application
var app = require('./config/express3')(db);

console.log(app);
// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
var server = app.listen(config.port);

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
        accept(null, true);
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
    _socket.join(user.email);

    config.getGlobbedFiles('./app/controllers/**/*.js').forEach(function(modelPath) {
        var controller = require(path.resolve(modelPath));
        if(typeof controller.respond === 'function'){
            controller.respond(user.email,_socket,io);
        }
    });
});


// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);