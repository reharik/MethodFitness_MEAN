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
//var app = require('./config/express')(db)
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    passport = require('passport'),

    flash = require('connect-flash'),
//    config = require('./config'),
    consolidate = require('consolidate'),
    path = require('path'),
    mongoStore = require('connect-mongo')({
        session: session
    }),
    passportSocketIo = require('passport.socketio')

;
var app = express();


// Globbing model files
config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
});

// Setting application local variables
app.locals.title = config.app.title;
app.locals.description = config.app.description;
app.locals.keywords = config.app.keywords;
app.locals.jsFiles = config.getJavaScriptAssets();
app.locals.cssFiles = config.getCSSAssets();

// Passing the request url to environment locals
app.use(function(req, res, next) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    next();
});

// Should be placed before express.static
app.use(compress({
    filter: function(req, res) {
        return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
}));

// Showing stack errors
app.set('showStackError', true);

// Set swig as the template engine
app.engine('server.view.html', consolidate[config.templateEngine]);

// Set views path and view engine
app.set('view engine', 'server.view.html');
app.set('views', './app/views');

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
} else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
}

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

// Enable jsonp
app.enable('jsonp callback');

// CookieParser should be above session
app.use(cookieParser());

// Express MongoDB session storage
var sessionStore = new mongoStore({
    db: db.connection.db,
    collection: config.sessionCollection
});
app.use(session({
    key:         'express.sid',
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: sessionStore
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());




// Bootstrap passport config
require('./config/passport')();

app.use(flash());

// Use helmet to secure Express headers
app.use(helmet.xframe());
app.use(helmet.xssFilter());
app.use(helmet.nosniff());
app.use(helmet.ienoopen());
app.disable('x-powered-by');

// Setting the app router and static folder
app.use(express.static(path.resolve('./public')));

// Globbing routing files
config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
});

// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
        error: err.stack
    });
});

// Assume 404 since no middleware responded
app.use(function(req, res) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not Found'
    });
});




// Start the app by listening on <port>
var server = app.listen(config.port);

var io = require('socket.io').listen(server);


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








io.sockets.on('connection', function (socket) {
    console.log('someone connected');
        var user = socket.client.request.user;
        socket.join(user.email);
});





io.sockets.on('getClients', function (data) {
    console.log("whatthemotherfuck");
    io.sockets.on.emit('getClients',{
        data: [
            {
                "firstName": "Cox",
                "lastName": "Carney",
                "company": "Enormo",
                "employed": true
            },
            {
                "firstName": "Lorraine",
                "lastName": "Wise",
                "company": "Comveyer",
                "employed": false
            },
            {
                "firstName": "Nancy",
                "lastName": "Waters",
                "company": "Fuelton",
                "employed": false
            }]
    });
});









// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);