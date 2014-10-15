'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var calendar = require('../../app/controllers/calendar');

	// Calendar Routes
	app.route('/calendar')
		.get(calendar.view);

	// Finish by binding the Calendar middleware
	app.param('calendarId', calendar.calendarByID);
};