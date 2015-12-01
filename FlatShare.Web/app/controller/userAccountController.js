app.controller('userAccountController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {

    $scope.userAccounts = [];
    $scope.load = function () {
        dataService.getItems('UserAccount/GetUserAccount')
        .success(function (data) {
            angular.copy(data, $scope.userAccounts);
        })
        .error(function (data) {
            alert(data);
        });
        $scope.isSelectedUser = false;
    }

    $scope.setUser = function () {
        $scope.isSelectedUser = true;
        $scope.PayItem = {
            RowID: $(this)[0].item.RowID,
            ItemName: $(this)[0].item.ItemName,
            Remark: $(this)[0].item.Remark
        };
        $scope.userAccount = {
            RowID: $(this)[0].item.RowID,
            UserName: $(this)[0].item.UserName,
            LoginName: $(this)[0].item.LoginName,
            Password: $(this)[0].item.Password,
            Telephone: $(this)[0].item.Telephone,
            Remark: $(this)[0].item.Remark,
        };
    };

    $scope.editUser = function () {
        dataService.updateItem("UserAccount/PutUserAccount", $scope.userAccount)
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function (data) {
            alert("修改失败");
        });
    };

    $scope.getPayItem = function () {
        payItemService.getPayItem().then(function (results) {
            $scope.PayItem = results.data;
        }, function (error) {
            alert(error);
        });
    };

    $scope.clickAddUser = function () {
        $('.click-highlight').removeClass('click-highlight');
        $scope.isSelectedUser = false;
        $scope.userAccount = {
            RowID: '',
            UserName: '',
            LoginName: '',
            Password: '',
            Telephone: '',
            Remark: ''
        };
    };

    $scope.saveOrEditUser = function () {
        if ($scope.userAccount.RowID == '') {
            $scope.saveUser();
        } else {
            $scope.editUser();
        }
    };

    $scope.saveUser = function () {
        $scope.userAccount.RowID = 0;
        dataService.addItem("UserAccount/PostUserAccount", $scope.userAccount)
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("添加失败");
        });
    };

    $scope.deleteUser = function () {
        if (confirm("是否删除些用户？") == false) {
            return;
        }
        dataService.deleteById("UserAccount/DeleteUserAccount", $scope.PayItem.RowID)
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("删除失败");
        });
    };

    $scope.load();
}]);