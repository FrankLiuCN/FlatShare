app.controller('outlayController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {
    $scope.payItems = [];
    $scope.users = [];
    $scope.outlays = [];
    $scope.selectdPayItem;
    $scope.totalCount = 0;
    $scope.itemsPerPage = 10;
    $scope.datepicker = { date: (new Date()).Format("yyyy-MM-dd") }
    $scope.payUserShare = {
        RowID: 0,
        ShareUserID: '',
        ShareUserName: '',
    };
    $scope.outlay = {
        RowID: '',
        PayMoney: '',
        PayItemID: '',
        PayUserID: '',
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

    $scope.getItems = function (take, skip) {
        dataService.getItems('Outlay/GetOutlays', { take: take, skip: skip, filter: $scope.filter })
        .success(function (data) {
            $scope.totalCount = data.total;
            angular.copy(data.outlays, $scope.outlays);
            $scope.currentPage = skip;
            $scope.totalPage = Math.floor(($scope.totalCount + $scope.itemsPerPage - 1) / $scope.itemsPerPage);
            $scope.calculateTotalPage();
        })
        .error(function (data) {
            alert(data);
        });
        $scope.isSelectedOutlay = false;
    }

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
            if (!$scope.isSelectedOutlay) {
                $scope.payUserShare = {
                    RowID: 0,
                    ShareUserID: '',
                    ShareUserName: '',
                };
            }
            $scope.shareUsers = [];
            for (var i = 0; i < $scope.users.length; i++) {
                var isSelected;
                if (!$scope.isSelectedOutlay) {
                    if (i < $scope.users.length - 1) {
                        $scope.payUserShare.ShareUserID += $scope.users[i].RowID + ",";
                        $scope.payUserShare.ShareUserName += $scope.users[i].UserName + ",";
                    } else {
                        $scope.payUserShare.ShareUserID += $scope.users[i].RowID;
                        $scope.payUserShare.ShareUserName += $scope.users[i].UserName;
                    }
                    isSelected = true;
                } else {
                    isSelected = $scope.checkUserSelected($scope.users[i].RowID);
                }
                $scope.user = {
                    RowID: $scope.users[i].RowID,
                    UserName: $scope.users[i].UserName,
                    IsSelected: isSelected
                };
                $scope.shareUsers.push($scope.user);
            }
        })
        .error(function (data) {
            alert(data);
        });

    };

    $scope.checkUserSelected = function (id) {
        var ids = [];
        if ($scope.payUserShare.ShareUserID != "") {
            ids = $scope.payUserShare.ShareUserID.split(",");
        }
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                return true;
            }
        }
        return false;
    };

    $scope.userChecked = function ($event, id, name) {
        for (var i = 0; i < $scope.shareUsers.length; i++) {
            if ($scope.shareUsers[i].RowID == id) {
                $scope.shareUsers[i].IsSelected = !$scope.shareUsers[i].IsSelected;
                break;
            }
        }
    };

    $scope.addOrEditOutlay = function () {
        $scope.payUserShare.ShareUserID = "";
        $scope.payUserShare.ShareUserName = "";
        for (var i = 0; i < $scope.shareUsers.length; i++) {
            if ($scope.shareUsers[i].IsSelected) {
                $scope.payUserShare.ShareUserID += $scope.users[i].RowID + ",";
                $scope.payUserShare.ShareUserName += $scope.users[i].UserName + ",";
            }
        }
        $scope.payUserShare.ShareUserID = $scope.payUserShare.ShareUserID.replace(/.$/g, '');
        $scope.payUserShare.ShareUserName = $scope.payUserShare.ShareUserName.replace(/.$/g, '');
        if ($scope.outlay.RowID == '') {
            $scope.saveOutlay();
        } else {
            $scope.editUser();
        }
    };

    $scope.editUser = function () {
        $scope.outlay.PayDate = $('.datepicker').val();
        dataService.updateItem("Outlay/EditOutlay", { payUserShare: $scope.payUserShare, outlay: $scope.outlay })
        .success(function (data) {
            $scope.getItems($scope.itemsPerPage, $scope.currentPage);
            $("#addOrEditModal").modal('hide');
        })
        .error(function (data) {
            alert("修改失败");
        });
    };

    $scope.saveOutlay = function () {
        $scope.outlay.PayDate = $('.datepicker').val();
        $scope.outlay.RowID = 0;
        dataService.addItem("Outlay/PostOutlay", { payUserShare: $scope.payUserShare, outlay: $scope.outlay })
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("添加失败");
        });
    };

    $scope.clickAddOutlay = function () {
        $scope.isSelectedOutlay = false;
        $('.click-highlight').removeClass('click-highlight');
        $scope.outlay = {
            RowID: '',
            PayMoney: '',
            PayItemID: '',
            PayUserID:'',
            PayDate: '',
            ShareID: 0,
            Remark: '',
            LogicalDelete: '',
        };
        $scope.loadPayItems();
        $scope.loadUsers();
    };

    $scope.clickEditPayItem = function () {
        $scope.loadPayItems();
        $scope.loadUsers();
    };

    $scope.setOutlay = function () {
        $scope.isSelectedOutlay = true;
        $scope.outlay = {
            RowID: $(this)[0].outlay.RowID,
            PayMoney: $(this)[0].outlay.PayMoney,
            PayItemID: $(this)[0].outlay.PayItemID,
            PayUserID: $(this)[0].outlay.PayUserID,
            PayDate: $(this)[0].outlay.PayDate,
            ShareID: $(this)[0].outlay.ShareID,
            Remark: $(this)[0].outlay.Remark,
            LogicalDelete: $(this)[0].outlay.LogicalDelete,
        };
        $scope.payUserShare.ShareUserID = $(this)[0].outlay.ShareUserID;
        $scope.payUserShare.ShareUserName = $(this)[0].outlay.ShareUserName;
    };

    $scope.deleteOutlay = function () {
        if (confirm("是否删除此记录？") == false) {
            return;
        }
        dataService.deleteById("Outlay/DeleteOutlay", $scope.outlay.RowID)
        .success(function (data) {
            $scope.getItems($scope.itemsPerPage, $scope.currentPage);
        })
        .error(function () {
            alert("删除失败");
        });
    };
    $scope.load();
}]);