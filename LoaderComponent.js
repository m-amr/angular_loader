/**
 * Created by amr on 11/6/15.
 */

"use strict";

// 1 - define module.
var loaderModule = angular.module('loader-component', []);

// 2- define provider
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
