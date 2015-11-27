app.factory('payItemService', ['$http', function ($http) {
    var payItemServiceFactory = {};
    var _getPayItems = function () {
        return $http.get(serviceBase + 'PayItem').then(function (results) {
            return results;
        });
    };

    var _savePayItem = function (data) {
        return $http.post(serviceBase + 'PayItem', data).then(function (response) {
            return response;
        });
    };

    payItemServiceFactory.getPayItems = _getPayItems
    payItemServiceFactory.savePayItem = _savePayItem;
    return payItemServiceFactory;
}]);