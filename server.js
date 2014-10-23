'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose'),
    event = require('./app/services/ges/eventData.js'),
    uuid = require('node-uuid'),
    gesAppender = require('./app/services/ges/ges-appender.js');

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
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
var server = app.listen(config.port);

require('./config/socketIO')(server, db);

// Expose app
exports = module.exports = app;

gesAppender('BootstrapApplication', new event(uuid.v1(), 'BootstrapApplication', true, {}, {'CommitId':uuid.v1(), CommandTypeName:'BootstrapApplication'}),function(){});

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);