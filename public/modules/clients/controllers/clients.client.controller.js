'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', 'Authentication', 'socketIo', '$log', '$state',
	function($scope, Authentication, socketIo, $log, $state ) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            this.client = {};
        };

//		// Find a list of Clients
		$scope.find = function() {
            console.log('calling get clients');
            socketIo.emit('getClients');
        };
        socketIo.on('getClients', function (data) {
            $scope.myData = data;
        });

        $scope.createClient = function() {
                socketIo.emit('createClient');
        };

        socketIo.on('createClient', function(){
            $state.transitionTo('listClients');
        });
	}
]);