/**
 * Created by amr on 11/6/15.
 */

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