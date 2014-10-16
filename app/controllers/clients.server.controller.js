'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Client = mongoose.model('Client'),
	_ = require('lodash');

/**
 * Create a Client
 */
exports.create = function(req, res) {
	var client = new Client(req.body);
	client.user = req.user;

	client.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};

exports.getClients = function(req, res) {
    console.log('server: getClients');

            res.jsonp( [
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
            }]);

};

/**
 * Show the current Client
 */
exports.read = function(req, res) {
	res.jsonp(req.client);
};

/**
 * Update a Client
 */
exports.update = function(req, res) {
	var client = req.client ;

	client = _.extend(client , req.body);

	client.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};

/**
 * Delete an Client
 */
exports.delete = function(req, res) {
	var client = req.client ;

	client.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(client);
		}
	});
};

/**
 * List of Clients
 */
exports.list = function(req, res) { Client.find().sort('-created').populate('user', 'displayName').exec(function(err, clients) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(clients);
		}
	});
};

/**
 * Client middleware
 */
exports.clientByID = function(req, res, next, id) { Client.findById(id).populate('user', 'displayName').exec(function(err, client) {
		if (err) return next(err);
		if (! client) return next(new Error('Failed to load Client ' + id));
		req.client = client ;
		next();
	});
};

/**
 * Client authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.client.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};