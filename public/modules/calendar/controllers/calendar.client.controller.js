'use strict';

// Calendar controller
angular.module('calendar').controller('CalendarsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Calendar',
	function($scope, $stateParams, $location, Authentication, Calendar ) {
		$scope.authentication = Authentication;

		// Create new Calendar
		$scope.create = function() {
			// Create new Calendar object
			var calendar = new Calendar ({
				name: this.name
			});

			// Redirect after save
			calendar.$save(function(response) {
				$location.path('calendar/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Calendar
		$scope.remove = function( calendar ) {
			if ( calendar ) { calendar.$remove();

				for (var i in $scope.calendar ) {
					if ($scope.calendar [i] === calendar ) {
						$scope.calendar.splice(i, 1);
					}
				}
			} else {
				$scope.calendar.$remove(function() {
					$location.path('calendar');
				});
			}
		};

		// Update existing Calendar
		$scope.update = function() {
			var calendar = $scope.calendar ;

			calendar.$update(function() {
				$location.path('calendar/' + calendar._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Calendar
		$scope.find = function() {
			$scope.calendar = Calendar.query();
		};

		// Find existing Calendar
		$scope.findOne = function() {
			$scope.calendar = Calendar.get({
				calendarId: $stateParams.calendarId
			});
		};
	}
]);