'use strict';

angular.module('myApp')
  .controller('ListController', function ($scope, $http, $rootScope, $location, $modal) {
  	
  	$scope.sorting = 'id';
  	$scope.visible = true;
  	$scope.pageLength = 50;
  	$scope.currentPage = 1;
  	$scope.pageStatus = false;
  	$scope.catStatus = true;
  	$scope.Selected = new Array();
  	$scope.noSelected = new Array();

  	if($rootScope.categories == null)
  	{	$scope.catStatus = false;
  		$http.get("backend/categories.php").success(function(data) {
			    $scope.categories = data;
			    $rootScope.categories = $scope.categories;
			    $scope.catStatus = true;
			 }).error(function(data) {
			  	console.log("Web service error");
		});
  	}
  	$scope.categories = $rootScope.categories;

  	$http.post("backend/productFilter.php", $rootScope.Params).success(function(data) {
			    $scope.products = data[0].products;
			    $scope.status = true;
			    $scope.count = data[0].products.length;			   
			    $scope.total = data[1].count;
			    if($scope.total>0){
			    	$scope.visible = true;
			    	if($scope.total>$scope.pageLength)
			    		$scope.pageStatus = true;
			    }
			    else
			    	$scope.visible = false;
			 }).error(function(data) {
			  	console.log("Web service error");
	});

	$scope.changePage = function(){
		$rootScope.Params.pageLength = $scope.pageLength;
		$rootScope.Params.currentPage = $scope.currentPage;

		$http.post("backend/productFilter.php", $rootScope.Params).success(function(data) {
			    $scope.products = data[0].products;
			    $scope.status = true;
			    $scope.count = data[0].products.length;			   
			    $scope.total = data[1].count;
			    if($scope.total>0){
			    	$scope.visible = true;
			    	if($scope.total>$scope.pageLength)
			    		$scope.pageStatus = true;
			    	$scope.showSelected();
			    }
			    else
			    	$scope.visible = false;
			 }).error(function(data) {
			  	console.log("Web service error");
		});
	}

	$scope.selectAll = function() {
		$rootScope.Params.isSelected = true;
		$scope.Selected = new Array();
  	for(var i=0; i<$scope.count; i++){
  		$scope.products[i].idSelected=true;
  	}
	};

	$scope.selectNone = function() {
		$scope.noSelected = new Array();
		$rootScope.Params.isSelected = false;
  	for(var i=0; i<$scope.count; i++){
  		$scope.products[i].idSelected=false;
  	}
	};

	$scope.selection = function(idSelected){
		if($rootScope.Params.isSelected){
			if($scope.removeSelection($scope.noSelected, idSelected))
				$scope.noSelected.push(parseInt(idSelected));
		}
		else{
			if($scope.removeSelection($scope.Selected, idSelected))
				$scope.Selected.push(parseInt(idSelected));
		}
	}

	$scope.removeSelection = function(tmpArray, idSelected){
		for(var i=0; i<tmpArray.length; i++){
			if(tmpArray[i]==idSelected)
				{ tmpArray[i] = null;
					return false;
					break;
				}
		}
		return true;
	}

	$scope.showSelected = function(){
		for(var i=0; i<$scope.count; i++){
			if($rootScope.Params.isSelected){
				for(var j=0; j<$scope.noSelected.length; j++){
					if($scope.products[i].id == $scope.noSelected[j]){
						$scope.products[i].idSelected = false;
					}
				}
			}
			else{
				for(var j=0; j<$scope.Selected.length; j++){
					if($scope.products[i].id == $scope.Selected[j]){
						$scope.products[i].idSelected = true;
					}
				}
			}
		}
	}
	
	$scope.$on('event:confirm', function () {
		$scope.setIsDelete();
		$scope.actions();
  });

	$scope.actions = function(){
		if($scope.validate()){
			$scope.formData = {
				isEnable: $scope.isEnable,
				isDisable: $scope.isDisable,
				isDelete: $scope.isDelete,
				category: $scope.category,
				moveTo: $scope.moveTo,
				isSelected: $rootScope.Params.isSelected,
				noSelected: $scope.noSelected,
				Selected: $scope.Selected
			};
			$rootScope.Params = $scope.formData;
			$location.path("/actions");
		}
		else{
			$scope.alerts = [
		    { type: 'danger', msg: 'Please check at least one' }
		  ];
		}	  
  		
	};
	$scope.closeAlert = function(index) {
	    $scope.alerts.splice(index, 1);
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

	$scope.validate = function(){
		if(($rootScope.Params.isSelected==true)&&($scope.noSelected.length<$scope.count)){
				return true;
		}
		if(($rootScope.Params.isSelected==false)&&($scope.Selected.length>0)){
				for(var i=0; i<$scope.Selected.length; i++){
					if($scope.Selected[i]!=null)
					{							
						return true;
					}
				}
		}
		return false;
	}

	//MODAL FUNCTIONS
	$scope.open = function (size) {
	    var modalInstance = $modal.open({
	      templateUrl: 'myModalContent.html',
	      controller: ModalInstanceCtrl,
	      size: size
	    });
	};
});
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope,$rootScope, $modalInstance) {

  $scope.ok = function () {
    $rootScope.$broadcast('event:confirm');
    $modalInstance.close();
    return true;
  };

  $scope.cancel = function () {	
    $modalInstance.dismiss('cancel');
    return false;
  };
};