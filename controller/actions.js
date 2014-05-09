'use strict';

angular.module('myApp')
  .controller('ActionsController', function ($scope, $http, $rootScope) {
  	var j=0;
    var tmp = $rootScope.Params.products.length;
    var tProducts = new Array();
    var isEnable, isDisable, isDelete, moveTo, category, index;
    $scope.finishReindex = true;
    $scope.reindexWait = false;

    var action = {action: "--mode-manual"};
    $http.post("http://10.0.15.12/otteny.com/cleanup/backend/indexes.php", action).success(function(data) {
         }).error(function(data) {
            console.log("Web service error");
    });

    for(var i=0; i<tmp; i++){
      if($rootScope.Params.products[i]!=null){
        tProducts[j] = $rootScope.Params.products[i];
        isEnable= $rootScope.Params.isEnable;
        isDisable= $rootScope.Params.isDisable;
        isDelete= $rootScope.Params.isDelete;
        moveTo = $rootScope.Params.moveTo;
        category= $rootScope.Params.category;
        j++;
      }
    }

    $scope.count = j;
    $scope.itemCount = 0;
    $scope.finish = false;
    $scope.products = new Array();
    index = true;

    for(var i=0; i<$scope.count; i++){
      if(i!=0){ 
        index = false;
      }

      var formData = {
        isEnable: isEnable,
        isDisable: isDisable,
        isDelete: isDelete,
        products: tProducts[i],
        moveTo: moveTo,
        category: category,
        index: index
      };
      
      $http.post("http://10.0.15.12/otteny.com/cleanup/backend/actions.php", formData).success(function(data) {
            $scope.products[$scope.itemCount] = data;
            $scope.itemCount++;
            if($scope.itemCount==$scope.count)
                { var sendData = {products: $scope.products};
                  $http.post("backend/products.php", sendData).success(function(data) {
                    $scope.finish = true;
                    }).error(function(data) {
                        console.log("Web service error");
                    });
                 }
      	 }).error(function(data) {
      	  	console.log("Web service error");
      	 });
      
    }

    if($rootScope.Params.isEnable=='true')
      $scope.formAction = "Enabled products";

    if($rootScope.Params.isDisable=='true')
      $scope.formAction = "Disabled products";

    if($rootScope.Params.isDelete=='true')
      $scope.formAction = "Deleted products";

    if($rootScope.Params.moveTo=='true')
      $scope.formAction = "Added products to category id: "+$rootScope.Params.category;

    $scope.reindexAll = function(){
        action = {action: "--reindexall"};
        $scope.finishReindex = false;
        $scope.reindexWait = true;
        $http.post("http://10.0.15.12/otteny.com/cleanup/backend/indexes.php", action).success(function(data) {
            if(data.status)
              {
                $scope.finishReindex = true;
                $scope.reindexWait = false;
              }
         }).error(function(data) {
            console.log("Web service error");
        });
    };

    $scope.indexAuto = function(){
        action = {action: "--mode-realtime"};
        $scope.finishReindex = false;
        $http.post("http://10.0.15.12/otteny.com/cleanup/backend/indexes.php", action).success(function(data) {
            if(data.status)
                $scope.finishReindex = true;
         }).error(function(data) {
            console.log("Web service error");
        });
    };

    $scope.indexManual = function(){
      action = {action: "--mode-manual"};
      $http.post("http://10.0.15.12/otteny.com/cleanup/backend/indexes.php", action).success(function(data) {
          if(data.status)
              $scope.finishReindex = true;
           }).error(function(data) {
              console.log("Web service error");
      });
    }
    
  });