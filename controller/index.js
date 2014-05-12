'use strict';

angular.module('myApp')
  .controller('IndexController', function ($scope, $http , $rootScope, $location) {
  	var formData = {
			meth: 'isLoggedIn'
		};
	var action = {action: "--mode-manual"};
	$scope.reindex = false;
  	/*$http.post("backend/users.php", formData).success(function(data) {
			    console.log(data);
			    $scope.loggedIn = data.status;
			 }).error(function(data) {
			  	console.log("Web service error");
	});*/

	$rootScope.isLoggedIn = true;

	$scope.reindexAll = function(){
		$scope.reindex = true;
        action = {action: "--reindexall"};
        $http.post("backend/indexes.php", action).success(function(data) {
            if(data.status)
              {
                $scope.reindex = false;
              }
         }).error(function(data) {
            console.log("Web service error");
        });
    };

    $scope.indexAuto = function(){
        action = {action: "--mode-realtime"};
        $http.post("backend/indexes.php", action).success(function(data) {
            if(data.status){
              	$scope.alertas = [
			    { type: 'success', msg: 'Indexes were successfully changed to update on save' }];			    
			}
         }).error(function(data) {
            console.log("Web service error");
        });
    };

    $scope.indexManual = function(){
      action = {action: "--mode-manual"};
      $http.post("backend/indexes.php", action).success(function(data) {
          if(data.status)
            {
              	$scope.alertas = [
			    { type: 'success', msg: 'Indexes were successfully changed to Manual update' }];			    
			}
           }).error(function(data) {
              console.log("Web service error");
      });
    }

    $scope.closeAlert = function(index) {
	    $scope.alertas.splice(index, 1);
	};
});