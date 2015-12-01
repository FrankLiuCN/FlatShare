var app = angular.module('FlatShareApp', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider.when("/payItem", {
        controller: "payItemController",
        templateUrl: "/payItem.html"
    });

    $routeProvider.when("/outPay", {
        controller: "outPayController",
        templateUrl: "/OutPay.html"
    });

    //$routeProvider.otherwise({ redirectTo: "/payItem" });

});

var serviceBase = '/api/';

function webRoot(url) {
    if (url.substring(0, 1) === "/") {
        return serviceBase + url.substring(1);
    }
    else {
        return serviceBase + url;
    }
}