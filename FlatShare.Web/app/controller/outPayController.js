app.controller('outPayController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {
    $scope.PayItems = [];

    $scope.loadPayItems = function () {
        dataService.getItems('PayItem/GetPayItems')
        .success(function (data) {
            angular.copy(data.PayItems, $scope.PayItems);
        })
        .error(function (data) {
            alert(data);
        });
    };



    $scope.addOrEditOutPay = function () {
        $scope.loadPayItems();
    };
    $scope.loadPayItems();
}]);