'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
            templateUrl: 'main.html',
            controller: 'MainController'
        })
      .when('/list', {
            templateUrl: 'list.html',
            controller: 'ListController',
            globalaccess: true
        })
      .when('/actions', {
            templateUrl: 'actions.html',
            controller: 'ActionsController',
            globalaccess: true
        })
      .otherwise({
        redirectTo: '/'
      });
      
  }); 