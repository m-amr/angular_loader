/**
 * Created by amr on 11/6/15.
 */

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