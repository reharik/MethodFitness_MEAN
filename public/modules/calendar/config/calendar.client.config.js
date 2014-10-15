'use strict';

// Configuring the Articles module
angular.module('calendar').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Calendar', 'calendar', 'item', '/calendar');
	}
]);