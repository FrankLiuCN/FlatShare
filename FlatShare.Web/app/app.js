var app = angular.module('FlatShareApp', []);

var serviceBase = '/api/';

function webRoot(url) {
    if (url.substring(0, 1) === "/") {
        return serviceBase + url.substring(1);
    }
    else {
        return serviceBase + url;
    }
}