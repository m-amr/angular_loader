/*! angular_loader - v1.0.0 - 2015-11-06 */ 
var loaderModule = angular.module('loader-component', []);
loaderModule.factory('loaderHttpInterceptor', ['$q', '$rootScope', function($q, $rooScope) {
    return {
        // optional method
        'request': function(config) {
            $rooScope.$broadcast('loading:start');
            return config;
        },

        // optional method
        'requestError': function(rejection) {

            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            // do something on success
            $rooScope.$broadcast('loading:finish');
            return response;
        },

        // optional method
        'responseError': function(rejection) {
            // do something on error
            $rooScope.$broadcast('loading:finish');
            return $q.reject(rejection);
        }
    };
}]);
loaderModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loaderHttpInterceptor');
}]);
// 3- define directive.
loaderModule.directive('loaderElement', [function(){

    var Loader = function(){};
    Loader.prototype.show = function(element){
        element[0].style.display = 'block';
    };
    Loader.prototype.hide = function(element){
        element[0].style.display = 'none';
    };
    var _loader = new Loader();

    return {
        restrict: 'A',
        scope: {},
        link: function($scope, $element) {
            _loader.hide(angular.element($element));
            $scope.$on('loading:start', function(){
                _loader.show($element);
            });

            $scope.$on('loading:finish', function(){
                _loader.hide($element);
            });
        }
    }
}]);