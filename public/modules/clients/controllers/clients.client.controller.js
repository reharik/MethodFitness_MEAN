'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'socketIo', '$log',
	function($scope, $stateParams, $location, Authentication, Clients, socketIo, $log ) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            this.client = new Clients();
        };
//
//		// Find a list of Clients
		$scope.find = function() {
            socketIo.emit('getClients');
        };
        socketIo.on('getClients', function (data) {
            $scope.myData = data;
        });

        $scope.createClient = function() {
            socketIo.emit('createClient',$scope.client,function(){
                alert('hi');
            });
        };
//		// Find existing Client
//		$scope.findOne = function() {
//			$scope.client = Clients.get({
//				clientId: $stateParams.clientId
//			});
//		};
	}
]);