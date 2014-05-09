'use strict';

angular.module('myApp')
  .controller('MainController', function ($scope, $http , $rootScope, $location) {
  	$scope.catStatus = false;
  	if($rootScope.categories == null){
	  	$http.get("http://10.0.15.12/otteny.com/cleanup/backend/categories.php").success(function(data) {
				    $scope.categories = data;
				    $rootScope.categories = $scope.categories;
				    $scope.catStatus = true;
				 }).error(function(data) {
				  	console.log("Web service error");
		});
	}
	else{
		$scope.categories = $rootScope.categories;
		$scope.catStatus = true;
	}

	  $scope.today = function() {
	    $scope.from = $scope.to = new Date();
	  };
	  $scope.todayday = new Date();
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event, opened) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope[opened] = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.initDate = new Date('2016-15-20');
	  $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];

	$scope.search = function(form){
		$scope.formData = {
			filter: $scope.filter,
			from: $scope.from,
			to: $scope.to,
			noStock: $scope.noStock,
			noPicture: $scope.noPicture,
			category: $scope.category,
			enabledProducts: $scope.enabledProducts,
			disabledProducts: $scope.disabledProducts,
			priceFrom: $scope.priceFrom,
			priceTo: $scope.priceTo,
			type: $scope.type_id
		};
		$rootScope.Params = $scope.formData;
		$location.path("/list");
	};

  });