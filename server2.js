'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose');

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
var app = require('./config/express')(db),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')({
        session: session
    });

var sessionStore = new mongoStore({
    db: db.connection.db,
    collection: config.sessionCollection
});
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: sessionStore
}));





// Bootstrap passport config
require('./config/passport')();
    var passportSocketIo = require('passport.socketio');

// Start the app by listening on <port>
var server = app.listen(config.port);

var io = require('socket.io').listen(server);
console.log('fuffuufufufuuuuuckkkkck');

io.sockets.on('connection', function (socket) {
    console.log('fuffuufufufuuuuuckkkkck');

//        var user = socket.request.user;
//        console.log('user.email: '+user.email);
//        console.log('user.name: '+user.name);
//        console.log('user.id: '+user.id);
    socket.on('join', function (data) {
        socket.join(data.email);
    });
});





    function onAuthorizeSuccess(data, accept){
        console.log('successful connection to socket.io');

        // The accept-callback still allows us to decide whether to
        // accept the connection or not.
        accept(null, true);

        // OR

        // If you use socket.io@1.X the callback looks different
        accept();
    }

    function onAuthorizeFail(data, message, error, accept){
        if(error)
            throw new Error(message);
        console.log('failed connection to socket.io:', message);

        // We use this callback to log all of our failed connections.
        accept(null, false);

        // OR

        // If you use socket.io@1.X the callback looks different
        // If you don't want to accept the connection
        if(error)
            accept(new Error(message));
        // this error will be sent to the user as a special error-package
        // see: http://socket.io/docs/client-api/#socket > error-object
    }


    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key:         'express.sid',       // the name of the cookie where express/connect stores its session_id
        secret:      config.sessionSecret,    // the session_secret to parse the cookie
        store:       sessionStore,        // we NEED to use a sessionstore. no memorystore please
        success:     onAuthorizeSuccess,  // *optional* callback on success - read more below
        fail:        onAuthorizeFail      // *optional* callback on fail/error - read more below
    }));













// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);