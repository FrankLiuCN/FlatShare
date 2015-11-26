app.controller('payItemController', ['$scope', 'payItemService', function ($scope, payItemService) {
    $scope.PayItems = [];
    payItemService.getPayItems().then(function (results) {
        $scope.PayItems = results;
    }, function (error) {
        alert(error);
    });

}]);