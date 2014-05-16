'use strict';

angular.module('myApp')
    .factory('API', function () {
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
