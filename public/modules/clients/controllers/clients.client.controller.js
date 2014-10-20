'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'socket', '$log',
	function($scope, $stateParams, $location, Authentication, Clients, socket, $log ) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            this.Client = new Client();
        }
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
		$scope.find = function() {
            socket.emit('getClients');
        }
        socket.on('getClients', function (data) {
            $scope.myData = data;
        });

        $scope.createClient = function() {
            socket.emit('createClient',function(){
                alert("hi");
            });
        }
//		// Find existing Client
//		$scope.findOne = function() {
//			$scope.client = Clients.get({
//				clientId: $stateParams.clientId
//			});
//		};
	}
]);