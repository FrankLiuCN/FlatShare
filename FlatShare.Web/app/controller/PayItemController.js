﻿app.controller('payItemController', ['$scope', "$filter", 'dataService', function ($scope, $filter, dataService) {

    $scope.isSelectedPayItem = false;
    $scope.totalCount = 0;
    $scope.itemsPerPage = 10;
    $scope.PayItems = [];
    $scope.PayItem = {
        RowID: '',
        ItemName: '',
        Remark: ''
    };

    $scope.load = function () {
        dataService.getItems('PayItem/GetPayItems', { take: $scope.itemsPerPage, skip: 0 })
        .success(function (data) {
            $scope.totalCount = data.total;
            angular.copy(data.PayItems, $scope.PayItems);
            $scope.totalPage = Math.floor(($scope.totalCount + $scope.itemsPerPage - 1) / $scope.itemsPerPage);
            $scope.currentPage = 0;
            gridInit($scope)
        })
        .error(function (data) {
            alert(data);
        });
        $scope.isSelectedPayItem = false;
    }


    $scope.getItems = function (take, skip) {
        dataService.getItems('PayItem/GetPayItems', { take: take, skip: skip, filter: $scope.filter })
        .success(function (data) {
            $scope.totalCount = data.total;
            angular.copy(data.PayItems, $scope.PayItems);
            $scope.currentPage = skip;
            $scope.totalPage = Math.floor(($scope.totalCount + $scope.itemsPerPage - 1) / $scope.itemsPerPage);
            $scope.calculateTotalPage();
        })
        .error(function (data) {
            alert(data);
        });
        $scope.isSelectedPayItem = false;
    }



    $scope.setPayItem = function () {
        $scope.isSelectedPayItem = true;
        $scope.PayItem = {
            RowID: $(this)[0].item.RowID,
            ItemName: $(this)[0].item.ItemName,
            Remark: $(this)[0].item.Remark
        };
    };

    $scope.editPayItem = function () {
        dataService.updateItem("PayItem/EditPayItem", $scope.PayItem)
        .success(function (data) {
            $scope.getItems($scope.itemsPerPage, $scope.currentPage);
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("修改失败");
        });
    };

    $scope.clickAddPayItem = function () {
        $('.click-highlight').removeClass('click-highlight');
        $scope.isSelectedPayItem = false;
        $scope.PayItem = {
            RowID: '',
            ItemName: '',
            Remark: ''
        };
    };

    $scope.saveOrEditPayItem = function () {
        if ($scope.PayItem.RowID == '') {
            $scope.savePayItem();
        } else {
            $scope.editPayItem();
        }
    };

    $scope.savePayItem = function () {
        $scope.PayItem.RowID = 0;
        dataService.addItem("PayItem/PostPayItem", $scope.PayItem)
        .success(function (data) {
            $scope.load();
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("添加失败");
        });
    };

    $scope.deletePayItem = function () {
        if (confirm("是否删除？") == false) {
            return;
        }
        dataService.deleteById("PayItem/DeletePayItem", $scope.PayItem.RowID)
        .success(function (data) {
            $scope.getItems($scope.itemsPerPage, $scope.currentPage);
            $("#addOrEditModal").modal('hide');
        })
        .error(function () {
            alert("删除失败");
        });
    };

    $scope.load();
}]);