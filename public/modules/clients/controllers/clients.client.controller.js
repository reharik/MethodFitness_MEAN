'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'socketIo',
	function($scope, $stateParams,$location, Authentication, Clients, socketIo) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            if($stateParams.clientId){}
            else{
                console.lo('sending getCreateClientViewModel');
                socketIo.emit('getCreateClientViewModel');
            }
        }
        socket.on('createClientViewModel', function (data) {
            $scope.viewModel=data;
            $scope.viewModel.client = new Clients();
        });

        $scope.createClient = function() {
            socketIo.emit('createClient',$scope.client,function(){
                alert('hi');
            });
        };
	}
]);