function gridInit(scope) {
    scope.groupedItems = [];
    scope.pagedItems = [];
    scope.filter = "";
    scope.itemCount = 5;

    scope.prevPage = function () {
        if (scope.currentPage > 0) {
            scope.currentPage--;
            scope.getItems(scope.itemsPerPage, scope.currentPage);
            scope.calculateTotalPage();
        }
    };

    scope.nextPage = function () {
        if (scope.currentPage < scope.totalPage-1) {
            scope.currentPage++;
            scope.getItems(scope.itemsPerPage, scope.currentPage);
            scope.calculateTotalPage();
        }
    };

    scope.search = function () {
        scope.currentPage = 0;
        scope.getItems(scope.itemsPerPage, scope.currentPage);
        scope.calculateTotalPage();
    };

    scope.calculateTotalPage = function () {
        scope.pagedItems = [];
        var start = scope.getStartPageNumber();
        var end = scope.getEndPageNumber();
        scope.pagedItems = [];
        var j = 0;
        for (var i = start; i <= end; i++) {
            scope.pagedItems[j] = i-1;
            j++;
        }

    };

    scope.getStartPageNumber = function () {
        var mid = Math.floor(scope.itemCount / 2);
        if (scope.totalPage < scope.itemCount || scope.currentPage - mid < 1) {
            return 1;
        }
        if ((scope.currentPage + mid) > scope.totalPage) {
            return scope.totalPage - scope.itemCount + 1;
        }
        return scope.currentPage - mid;
    };

    scope.getEndPageNumber = function () {
        var mid = Math.floor(scope.itemCount / 2);
        if ((scope.itemCount % 2) == 0) {
            mid--;
        }
        if ((scope.totalPage < scope.itemCount) || ((scope.currentPage + mid) >= scope.totalPage)) {
            return scope.totalPage;
        }
        if ((scope.currentPage - (scope.itemCount / 2)) < 1) {
            return scope.itemCount;
        }
        return scope.currentPage + mid;
    };

    scope.setPage = function () {
        scope.currentPage = this.n;
        scope.getItems(scope.itemsPerPage, scope.currentPage);
        scope.calculateTotalPage();
    };
    scope.calculateTotalPage();
}