app.factory('payItemService', ['$http', function ($http) {
    var payItemServiceFactory = {};



    var _getPayItems = function () {
        return $http.get(serviceBase + 'PayItem').then(function (results) {
            return results;
        });
    };

    var _getPayItem = function (id) {
        return $http.get(serviceBase + 'PayItem/'+id).then(function (results) {
            return results;
        });
    };

    var _savePayItem = function (data) {
        return $http.post(serviceBase + 'PayItem', data).then(function (response) {
            return response;
        });
    };

    var _editPayItem = function (id,data) {
        return $http.put(serviceBase + 'PayItem/' + id, data).then(function (response) {
            return response;
        });
    };

    var _deletePayItem = function (rowID) {
        return $http.delete(serviceBase + 'PayItem/' + rowID).then(function (results) {
            return results;
        });
    };

    payItemServiceFactory.getPayItem = _getPayItem
    payItemServiceFactory.getPayItems = _getPayItems
    payItemServiceFactory.savePayItem = _savePayItem;
    payItemServiceFactory.editPayItem = _editPayItem;
    payItemServiceFactory.deletePayItem = _deletePayItem;

    return payItemServiceFactory;
}]);