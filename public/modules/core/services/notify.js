/**
 * Created by Owner on 10/23/14.
 */

angular.module('core').factory('notify',['$rootScope', function ($rootScope) {
    var notify = {};
    notify.pub = function(msg, data){
        data = data || {};
        $rootScope.$emit(msg,data);
    };

    notify.sub = function(msg, func, scope){
        var unbind = $rootScope.$on(msg,func);

        if(scope){
            scope.$on('destroy', unbind);
        }
    };
    return notify;
}]);

