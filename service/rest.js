'use strict';

angular.module('myApp')
    .factory('API', function () {
        var avilable = true;
        return {
            base_url: 'backend/',
            auth: 'users.php',
            index: 'indexes.php',
            ready:'readyToGo.php?action=new',
            ready_clean:'readyToGo.php',
            actions:'actions.php',
            categories: 'categories.php',
            filter:'productFilter.php'
        };
    });
