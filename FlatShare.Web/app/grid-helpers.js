function gridInit(scope, filter) {

    scope.totalPage = 0;
    scope.groupedItems = [];
    scope.pagedItems = [];

    scope.prevPage = function () {
        if (scope.currentPage > 0) {
            scope.currentPage--;
            scope.getItems(scope.itemsPerPage, scope.currentPage);
        }
    };

    scope.nextPage = function () {
        if (scope.currentPage < scope.pagedItems.length - 1) {
            scope.currentPage++;
            scope.getItems(scope.itemsPerPage, scope.currentPage);
        }
    };

    scope.search = function () {
        scope.currentPage = 0;
        scope.calculateTotalPage();
    };

    scope.groupToPages = function () {
        scope.pagedItems = [];

        for (var i = 0; i < scope.filteredItems.length; i++) {
            if (i % scope.itemsPerPage === 0) {
                scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [scope.filteredItems[i]];
            } else {
                scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
            }
        }

    };

    scope.calculateTotalPage = function () {
        scope.totalPage = Math.floor((scope.totalCount + scope.itemsPerPage - 1) / scope.itemsPerPage);
        scope.pagedItems = [];
        for (var i = 0; i < scope.totalPage; i++) {
            scope.pagedItems[i] = i;
        }
    }

    scope.setPage = function () {
        scope.currentPage = this.n;
        scope.getItems(scope.itemsPerPage, scope.currentPage);
    };
    scope.search();
}