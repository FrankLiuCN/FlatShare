app.factory("dataService", ["$http", "$q", function ($http, $q) {
    return {
        getItems: function (url, p) {
            return $http.get(webRoot(url), {
                // query string like { userId: user.id } -> ?userId=value
                params: p
                // for sub-blogs with URL rewrite
            });
        },
        addItem: function (url, item) {
            return $http({
                url: webRoot(url),
                method: 'POST',
                data: item
            });
        },
        deleteItem: function (url, item) {
            if (item.Id) {
                return $http({
                    url: webRoot(url) + "/" + item.Id,
                    method: 'DELETE'
                });
            }
            else {
                return $http({
                    url: webRoot(url),
                    method: 'DELETE',
                    data: item,
                    headers: { 'Content-Type': 'application/json'}
                });
            }
        },
        // when item does not have "Id" field
        // we can pass name etc. as id here
        deleteById: function (url, id) {
            return $http({
                url: webRoot(url) + "/" + id,
                method: 'GET'
            });
        },
        // delete selected items
        deleteChecked: function (url, items) {
            return $http({
                url: webRoot(url) + url,
                method: 'DELETE',
                data: items
            });
        },
        updateItem: function (url, item) {
            return $http({
                url: webRoot(url),
                method: 'post',
                data: item
            });
        },
        // pass list to process all in one go
        processChecked: function (url, items) {
            return $http({
                url: webRoot(url),
                method: 'PUT',
                data: items
            });
        },
        // file upload
        uploadFile: function (url, file) {
            return $http({
                url: webRoot(url),
                method: 'POST',
                data: file,
                withCredentials: true,
                transformRequest: angular.identity
            });
        }
    };
}]);