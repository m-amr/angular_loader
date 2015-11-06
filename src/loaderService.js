/**
 * Created by amr on 11/6/15.
 */

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
