'use strict';

// Clients controller
angular.module('clients').controller('ClientsController', ['$scope', '$state','$stateParams', '$location', 'Authentication', 'Clients', 'socketIo', 'notify',
	function($scope, $state,$stateParams,$location, Authentication, Clients, socketIo, notify) {
		$scope.authentication = Authentication;
        $scope.init= function(){
            console.log('sending getCreateClientViewModel');
            if($stateParams.clientId){}
            else{
                socketIo.emit('getCreateClientViewModel');
            }
        };
        socketIo.on('createClientViewModel', function (data) {
            $scope.viewModel=data.viewModel;
            $scope.viewModel.client = new Clients();
        });

        $scope.createClient = function() {
            socketIo.emit('createClient',$scope.viewModel.client, function(){

            });
        };

        socketIo.on('clientCreatedCmdSent', function () {
            $state.transitionTo('listClients');
//            notify.pub("clientCreated");
        });
	}
]);