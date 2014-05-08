'use strict';

angular.module('myApp')
  .controller('IndexController', function ($scope, $http , $rootScope, $location) {
  	var formData = {
			meth: 'isLoggedIn'
		};

  	/*$http.post("backend/users.php", formData).success(function(data) {
			    console.log(data);
			    $scope.loggedIn = data.status;
			 }).error(function(data) {
			  	console.log("Web service error");
	});*/

	$rootScope.isLoggedIn = true;	 
});