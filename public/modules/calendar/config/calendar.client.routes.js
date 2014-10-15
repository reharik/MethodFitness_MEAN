'use strict';

//Setting up route
angular.module('calendar').config(['$stateProvider',
	function($stateProvider) {
		// Calendar state routing
		$stateProvider.
		state('listCalendars', {
			url: '/calendar',
			templateUrl: 'modules/calendar/views/list-calendar.client.view.html'
		}).
		state('createCalendar', {
			url: '/calendar/create',
			templateUrl: 'modules/calendar/views/create-calendar.client.view.html'
		}).
		state('viewCalendar', {
			url: '/calendar/:calendarId',
			templateUrl: 'modules/calendar/views/view-calendar.client.view.html'
		}).
		state('editCalendar', {
			url: '/calendar/:calendarId/edit',
			templateUrl: 'modules/calendar/views/edit-calendar.client.view.html'
		});
	}
]);