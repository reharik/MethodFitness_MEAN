'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clients', 'socketIo',
	function($scope, $stateParams,$location, Authentication, Clients, socketIo) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            console.log('sending getCreateClientViewModel');
            if($stateParams.clientId){}
            else{
                socketIo.emit('getCreateClientViewModel');
            }
        }
        socketIo.on('createClientViewModel', function (data) {
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