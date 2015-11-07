/*! angular_loader - v1.0.0 - 2015-11-07 */ 
(function(){

if(typeof angular === 'undefined'){
    throw 'This library use angular.js as a dependency, make sure that angular.js is loaded.';
}
var loaderModule = angular.module('loader-component', []);
loaderModule.service('loaderService', ['$rootScope', function($rootScope){
    var _service = this;

    var _loadingEvent = 'loading';
    var _startLoadingEvent = _loadingEvent + ':start';
    var _finishLoadingEvent = _loadingEvent + ':finish';

    _service.getStartLoadingEvent = function(){
        return _startLoadingEvent;
    };

    _service.getFinishLoadingEvent = function(){
        return _finishLoadingEvent;
    };

    _service.dispatchStartLoadingEvent = function(){
        $rootScope.$broadcast(_service.getStartLoadingEvent());
    };

    _service.dispatchFinishLoadingEvent = function(){
        $rootScope.$broadcast(_service.getFinishLoadingEvent());
    };

    _service.showElement = function(element){
        element[0].style.display = 'block';
    };

    _service.hideElement = function(element){
        element[0].style.display = 'none';
    };

}]);

loaderModule.factory('loaderHttpInterceptor', ['$q', 'loaderService', function($q, loaderService) {
    return {
        // optional method
        'request': function(config) {
            loaderService.dispatchStartLoadingEvent();
            return config;
        },

        // optional method
        'requestError': function(rejection) {
            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            loaderService.dispatchFinishLoadingEvent();
            return response;
        },

        // optional method
        'responseError': function(rejection) {
            loaderService.dispatchFinishLoadingEvent();
            return $q.reject(rejection);
        }
    };
}]);
loaderModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loaderHttpInterceptor');
}]);
// 3- define directive.
loaderModule.directive('loaderElement', ['loaderService', function(loaderService){

    return {
        restrict: 'A',
        scope: {},
        link: function($scope, $element) {
            loaderService.hideElement($element);

            $scope.$on(loaderService.getStartLoadingEvent(), function(){
                loaderService.showElement($element);
            });

            $scope.$on(loaderService.getFinishLoadingEvent(), function(){
                loaderService.hideElement($element);
            });
        }
    }
}]);
/*
 * support require.js
 * if define is a function
 * define module
 */

if(typeof define === 'function'){
    define(function(){
        return angular.module('loader-component');
    });
}

})();