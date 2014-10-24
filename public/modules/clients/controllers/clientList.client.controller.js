'use strict';

// Clients controller
angular.module('clients').controller('ClientListController', ['$scope', 'Authentication', 'socketIo',
	function($scope, Authentication, socketIo ) {
		$scope.authentication = Authentication;

//		// Find a list of Clients
		$scope.find = function() {
            socketIo.emit('getClients');
        };
        socketIo.on('getClients', function (data) {
            $scope.myData = data;
        });
	}
]);