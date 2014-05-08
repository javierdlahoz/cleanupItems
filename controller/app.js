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
            controller: 'ListController'
        })
      .when('/actions', {
            templateUrl: 'actions.html',
            controller: 'ActionsController'
        })
      .otherwise({
        redirectTo: '/'
      });
      
  }); 