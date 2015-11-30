function gridInit(scope, filter) {

    scope.totalPage = 0;
    scope.groupedItems = [];
    scope.pagedItems = [];
    scope.currentPage = 0;

    // set default if not passed in
    if (!scope.itemsPerPage) {
        scope.itemsPerPage = 5;
    }

    scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    scope.prevPage = function () {
        if (scope.currentPage > 0) {
            scope.currentPage--;
        }
    };

    scope.nextPage = function () {
        if (scope.currentPage < scope.pagedItems.length - 1) {
            scope.currentPage++;
        }
    };

    scope.search = function () {
        //scope.filteredItems = filter('filter')(scope.items, function (item) {
        //    for (var attr in item) {
        //        if (searchMatch(item[attr], scope.query))
        //            return true;
        //    }
        //    return false;
        //});
        //if (scope.sortingOrder !== '') {
        //    scope.filteredItems = filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
        //}
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
    };
    scope.search();
}