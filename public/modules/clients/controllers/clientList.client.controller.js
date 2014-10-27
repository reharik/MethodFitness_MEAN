'use strict';

// Clients controller
angular.module('clients').controller('ClientListController', ['$scope', 'Authentication', 'socketIo',
	function($scope, Authentication, socketIo ) {
		$scope.authentication = Authentication;

//		// Find a list of Clients
		$scope.find = function() {
            $scope.gridOptions = {
                enableSorting: true,
                columnDefs: [
                    { name:'firstName', field: 'FirstName' },
                    { name:'lastName', field: 'LastName' },
                    { name:'city', field: 'City'},
                    { name:'zip', field: 'Zip'}
                ]};
            socketIo.emit('getClients');
        };
        socketIo.on('getClients', function (data) {
            $scope.gridOptions.data= data;
        });
	}
]);