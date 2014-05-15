'use strict';

angular.module('myApp')
    .factory('API', function () {
        return {
            base_url: 'http://10.0.15.12/otteny.com/cleanup/backend/',
            auth: 'users.php',
            index: 'indexes.php',
            ready:'readyToGo.php?action=new',
            ready_clean:'readyToGo.php',
            actions:'actions.php',
            categories: 'categories.php',
            filter:'productFilter.php'
        };
    });
