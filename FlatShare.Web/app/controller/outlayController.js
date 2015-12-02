app.controller('outlayController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {
    $scope.payItems = [];
    $scope.users = [];
    $scope.outlays = [];
    $scope.selectdPayItem;
    $scope.totalCount = 0;
    $scope.itemsPerPage = 10;
    $scope.datepicker = { date: (new Date()).Format("yyyy-MM-dd") }
    $scope.outlay = {
        RowID: '',
        PayMoney: '',
        PayItemID: '',
        PayDate: '',
        ShareID: '',
        Remark: '',
        LogicalDelete: '',
    };
    $scope.load = function () {
        dataService.getItems('Outlay/GetOutlays', { take: $scope.itemsPerPage, skip: 0 })
        .success(function (data) {
            $scope.totalCount = data.total;
            angular.copy(data.outlays, $scope.outlays);
            $scope.totalPage = Math.floor(($scope.totalCount + $scope.itemsPerPage - 1) / $scope.itemsPerPage);
            $scope.currentPage = 0;
            gridInit($scope)
        })
        .error(function (data) {
            alert(data);
        });
        $scope.isSelectedOutlay = false;
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

    $scope.loadUsers = function () {
        dataService.getItems('UserAccount/GetUserAccount')
        .success(function (data) {
            angular.copy(data, $scope.users);
            for (var i = 0; i < $scope.users.length; i++) {
                if (i < $scope.users.length - 1) {
                    $scope.outlay.ShareID += $scope.users[i].RowID + ",";
                } else {
                    $scope.outlay.ShareID += $scope.users[i].RowID;
                }
            }
        })
        .error(function (data) {
            alert(data);
        });

    };

    $scope.userChecked = function ($event, id) {
        var ids = [];
        if ($scope.outlay.ShareID != "") {
            ids = $scope.outlay.ShareID.split(",");
        }
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids.splice(i, 1);
                $scope.outlay.ShareID = ids.toString();
                return;
            }
        }
        ids.push(id);
        $scope.outlay.ShareID = ids.toString();
    };

    $scope.addOrEditOutlay = function () {
        if ($scope.outlay.RowID == '') {
            $scope.saveOutlay();
        } else {
            $scope.editUser();
        }
    };

    $scope.saveOutlay = function () {
        $scope.outlay.PayDate = $('.datepicker').val();
        $scope.outlay.RowID = 0;
        dataService.addItem("Outlay/PostOutlay", $scope.outlay)
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("添加失败");
        });
    };

    $scope.clickAddOutlay = function () {
        $scope.outlay = {
            RowID: '',
            PayMoney: '',
            PayItemID: '',
            PayDate: '',
            ShareID: '',
            Remark: '',
            LogicalDelete: '',
        };
        $scope.loadPayItems();
        $scope.loadUsers();
    };
    $scope.load();
}]);