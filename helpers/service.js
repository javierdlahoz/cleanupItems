'use strict';

angular.module('myApp')
    .factory('MenuStatus', function () {
    	var statusGlobal;
        return {
            setMenu: function (status) {
                statusGlobal = status;
            },
            getMenu: function () {
                return statusGlobal;
            }
        };
    });