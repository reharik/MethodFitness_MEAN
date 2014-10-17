'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'socket', '$log',
	function($scope, $stateParams, $location, Authentication, Clients, socket, $log ) {
		$scope.authentication = Authentication;
        $log.log(socket);
        $scope.init=function(){
            console.log('firing the init func');
            socket.emit('getClients', function(result){
                console.log('returned from socket');
            });
        };
        $scope.init();

        socket.on('getClients', function (data) {
             $scope.myData = data.data;
        });
//            [
//            {
//                "firstName": "Cox",
//                "lastName": "Carney",
//                "company": "Enormo",
//                "employed": true
//            },
//            {
//                "firstName": "Lorraine",
//                "lastName": "Wise",
//                "company": "Comveyer",
//                "employed": false
//            },
//            {
//                "firstName": "Nancy",
//                "lastName": "Waters",
//                "company": "Fuelton",
//                "employed": false
//            }];
		// Create new Client
//		$scope.create = function() {
//			// Create new Client object
//			var client = new Clients ({
//				name: this.name
//			});
//
//			// Redirect after save
//			client.$save(function(response) {
//				$location.path('clients/' + response._id);
//
//				// Clear form fields
//				$scope.name = '';
//			}, function(errorResponse) {
//				$scope.error = errorResponse.data.message;
//			});
//		};
//
//		// Remove existing Client
//		$scope.remove = function( client ) {
//			if ( client ) { client.$remove();
//
//				for (var i in $scope.clients ) {
//					if ($scope.clients [i] === client ) {
//						$scope.clients.splice(i, 1);
//					}
//				}
//			} else {
//				$scope.client.$remove(function() {
//					$location.path('clients');
//				});
//			}
//		};
//
//		// Update existing Client
//		$scope.update = function() {
//			var client = $scope.client ;
//
//			client.$update(function() {
//				$location.path('clients/' + client._id);
//			}, function(errorResponse) {
//				$scope.error = errorResponse.data.message;
//			});
//		};
//
//		// Find a list of Clients
//		$scope.find = function() {
//			$scope.clients = Clients.query();
//		};
//
//		// Find existing Client
//		$scope.findOne = function() {
//			$scope.client = Clients.get({
//				clientId: $stateParams.clientId
//			});
//		};
	}
]);