app.controller('payItemController', ['$scope', 'payItemService', function ($scope, payItemService) {

    $scope.PayItems = [];
    $scope.PayItem = {
        ItemName: '',
        Remark: ''
    };
    payItemService.getPayItems().then(function (results) {
        $scope.PayItems = results.data;
    }, function (error) {
        alert(error);
    });

    $scope.savePayItem = function () {
        payItemService.savePayItem($scope.PayItem).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.PayItems.push(response.data);
            $scope.message = "添加成功";
        }, function (response) {
            $scope.savedSuccessfully = false;
            $scope.message = "添加失败";
        });
    };

}]);