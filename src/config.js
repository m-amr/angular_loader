/**
 * Created by amr on 11/6/15.
 */

loaderModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loaderHttpInterceptor');
}]);