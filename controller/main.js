'use strict';

angular.module('myApp')
  .controller('MainController', function ($scope, $http , $rootScope, $location , API) {
  	$scope.pageLength = 50;
  	$scope.currentPage = 1;
  	$scope.catStatus = false;
  	$rootScope.mainTitle = null;
  	$scope.onlyNumbers = /^[0-9]+$/;
  	
  	$http.get(API.base_url + API.ready).success(function(data) {});

  	if($rootScope.categories == null){
	  	$http.get(API.base_url + API.categories).success(function(data) {
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
        API.setAv(false);
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
			type: $scope.type_id,
			productName: $scope.productName,
			qtyFrom: $scope.qtyFrom,
			qtyTo: $scope.qtyTo,
			isSelected: true,
			pageLength: $scope.pageLength,
			currentPage: $scope.currentPage,
			sortBy: $scope.sortBy
		};
		if($scope.validate()){
			$rootScope.Params = $scope.formData;
			$rootScope.Collections = $rootScope.Params;
			$location.path("/list");
		}
	};

	$scope.validate = function(){
		if($scope.priceFrom>$scope.priceTo){
			$scope.alerts = [
			    { type: 'danger', msg: 'Please check your price amounts' }
			  ];
			return false;
		}
		if($scope.from>$scope.to){
			$scope.alerts = [
			    { type: 'danger', msg: 'Please check your dates' }
			  ];
			return false;	
		}
		if($scope.qtyFrom>$scope.qtyTo){
			$scope.alerts = [
			    { type: 'danger', msg: 'Please check your quantities' }
			  ];
			return false;	
		}
		if($scope.qtyTo==0){
			$scope.alerts = [
			    { type: 'danger', msg: 'Quantities must be higher than 0, if you want to search product with no stock, please use the "Products with no stock checkbox"' }
			  ];
			return false;
		}
		if($scope.priceTo==0){
			$scope.alerts = [
			    { type: 'danger', msg: 'Prices must be higher than 0' }
			  ];
			return false;
		}


		return true;
	}

	$scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
	};
  });