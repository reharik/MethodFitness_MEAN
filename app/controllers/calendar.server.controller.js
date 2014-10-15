'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Calendar = mongoose.model('Calendar'),
	_ = require('lodash');

/**
 * Create a Calendar
 */
exports.create = function(req, res) {
	var calendar = new Calendar(req.body);
	calendar.user = req.user;

	calendar.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(calendar);
		}
	});
};

/**
 * Show the current Calendar
 */
exports.view = function(req, res) {
	res.jsonp(req.calendar);
};


/**
 * Calendar middleware
 */
exports.calendarByID = function(req, res, next, id) { Calendar.findById(id).populate('user', 'displayName').exec(function(err, calendar) {
		if (err) return next(err);
		if (! calendar) return next(new Error('Failed to load Calendar ' + id));
		req.calendar = calendar ;
		next();
	});
};

/**
 * Calendar authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.calendar.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};