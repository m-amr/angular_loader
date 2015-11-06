/*! angular_loader - v1.0.0 - 2015-11-06 */ 
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