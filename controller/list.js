'use strict';

angular.module('myApp')
  .controller('ListController', function ($scope, $http, $rootScope, $location) {
  	
  	$scope.sorting = 'id';
  	$scope.visible = true;
  	$scope.pageLength = 50;
  	$scope.currentPage = 1;
  	$scope.pageStatus = false;
  	$scope.catStatus = true;

  	if($rootScope.categories == null)
  	{	$scope.catStatus = false;
  		$http.get("http://10.0.15.12/otteny.com/cleanup/backend/categories.php").success(function(data) {
			    $scope.categories = data;
			    $rootScope.categories = $scope.categories;
			    $scope.catStatus = true;
			 }).error(function(data) {
			  	console.log("Web service error");
		});
  	}
  	$scope.categories = $rootScope.categories;

  	$http.post("http://10.0.15.12/otteny.com/cleanup/backend/productFilter.php", $rootScope.Params).success(function(data) {
			    $scope.table = data;
			    $scope.status = true;
			    $scope.count = data.length;
			    $scope.pages = getPagination($scope.table, $scope.pageLength);

			    if($scope.count>0){
			    	$scope.visible = true;
			    	if($scope.count>$scope.pageLength)
			    		{ $scope.pages = getPagination($scope.table, $scope.pageLength);
			    		  $scope.pageStatus = true;			    		  
			    		}
			    	else{
			    		$scope.pages[0] = $scope.table;
			    		$scope.pageStatus = false;
			    	}		
			    }
			    else
			    	$scope.visible = false;
			 }).error(function(data) {
			  	console.log("Web service error");
	});

	$scope.changePage = function(page){
		$scope.currentPage = page;
		activatePage($scope.currentPage, $scope.pages.length);
	}

	$scope.nextPage = function(){
		if($scope.currentPage!=$scope.pages.length-1)
			$scope.currentPage++;
		activatePage($scope.currentPage, $scope.pages.length);
	}

	$scope.lastPage = function(){
		if($scope.currentPage!=0)
			$scope.currentPage--;
		activatePage($scope.currentPage, $scope.pages.length);
	}

  	$scope.selectAll = function() {
    	for(var i=0; i<$scope.count; i++){
    		$scope.table[i].idSelected=true;
    	}
  	};

  	$scope.selectNone = function() {
    	for(var i=0; i<$scope.count; i++){
    		$scope.table[i].idSelected=false;
    	}
  	};

  	$scope.actions = function(form){
  		var selectedItems = new Array();
    	for(var i=0; i<$scope.count; i++){
    		if($scope.table[i].idSelected==true){
    			selectedItems[i] = $scope.table[i].id;
    		}
    	}

		$scope.formData = {
			products: selectedItems,
			isEnable: $scope.isEnable,
			isDisable: $scope.isDisable,
			isDelete: $scope.isDelete,
			category: $scope.category,
			moveTo: $scope.moveTo
		};

		$rootScope.Params = $scope.formData;
		$location.path("/actions");
	};

	$scope.setIsDelete = function(){
		$scope.isDelete = "true";
	};
	
	$scope.setIsEnable = function(){
		$scope.isEnable = "true";
	};

	$scope.setIsDisable = function(){
		$scope.isDisable = "true";
	};

	$scope.moveToCategory = function(){
		$scope.moveTo = "true";
	}

	$scope.sortBy = function(tSorting){
		$scope.sorting = tSorting;
	}
  });