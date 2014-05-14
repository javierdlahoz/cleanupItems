'use strict';

angular.module('myApp')
  .controller('ActionsController', function ($scope, $http, $rootScope) {
  	var j=0;
    var isEnable, isDisable, isDelete, moveTo, category, index;
    $scope.finishReindex = true;
    $scope.reindexWait = false;
    $scope.ready = false;

    var action = {action: "--mode-manual"};
    $http.post("backend/indexes.php", action).success(function(data) {
         }).error(function(data) {
            console.log("Web service error");
    });

    var formData = $rootScope.Params;     
    $scope.count = j;
    $scope.itemCount = 0;
    $scope.finish = false;
    $scope.products = new Array();
    index = true;
    var end = false;

    $http.post("backend/readyToGo.php", $rootScope.Collections).success(function(data){
      console.log(data);
      $scope.ready = data.ready;
      if($scope.ready){ 
        console.log("ya entro"); 
        $http.post("backend/actions.php", formData).success(function(data) {
              console.log(data);
              while(!end){
                $http.get("backend/results.json").success(function(data) {
                  console.log(data);
                  if(data.total>data.index)
                    end = true;
                  $scope.count = data.total;
                  $scope.itemCount = data.index; 
                });
              }
              /*if($scope.itemCount==$scope.count)
                  { var sendData = {products: $scope.products};
                    $http.post("backend/products.php", sendData).success(function(data) {
                      $scope.finish = true;
                      }).error(function(data) {
                          console.log("Web service error");
                      });
                   }*/
        	 }).error(function(data) {
        	  	console.log("Web service error");
        	 });
      }
    });

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
        $http.post("backend/indexes.php", action).success(function(data) {
            if(data.status)
              {
                $scope.finishReindex = true;
                $scope.reindexWait = false;
              }
         }).error(function(data) {
            console.log("Web service error");
        });
    };
    
  });