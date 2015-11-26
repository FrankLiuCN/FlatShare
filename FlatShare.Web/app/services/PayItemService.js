app.factory('payItemService', ['$http', function ($http) {
    var serviceBase = 'api/PayItem/GetPayItem';
    var _getPayItems = function () {
        return $http.get(serviceBase).then(function (results) {
            return results;
        });
    };

    payItemServiceFactory.getPayItems = _getPayItems;
    return payItemServiceFactory;
}]);