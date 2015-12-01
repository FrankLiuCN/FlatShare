app.controller('outPayController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {
    $scope.payItems = [];
    $scope.selectdPayItem;
    $scope.outlay = {
        RowID: '',
        PayMoney: '',
        PayItemID: '',
        PayDate: '',
        ShareID: '',
        Remark: '',
        LogicalDelete: '',
    };

    $scope.loadPayItems = function () {
        dataService.getItems('PayItem/GetPayItems')
        .success(function (data) {
            angular.copy(data, $scope.payItems);
        })
        .error(function (data) {
            alert(data);
        });
    };



    $scope.addOrEditOutPay = function () {
        $scope.loadPayItems();
    };
}]);