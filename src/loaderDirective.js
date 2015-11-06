/**
 * Created by amr on 11/6/15.
 */

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