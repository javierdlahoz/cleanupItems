'use strict';

angular.module('myApp')
  .controller('ActionsController', function ($scope, $http, $rootScope , API) {

    $scope.stopbtn = true;

    $scope.continue = function(){
        $scope.stopbtn = true;
      $scope.stop = false;
      if($rootScope.Params.isSelected){
        selectedAllPost($scope.itemCount);
      }
      else{
        noSelectedPost($scope.itemCount);
      }
    }

    $scope.cancelStop = function(){
      $scope.stopbtn = false;
      $scope.stop = true;
    };

    var isEnable, isDisable, isDelete, moveTo, category, index;
    $scope.ready = false;

    var formData = $rootScope.Params;     
    $scope.count = 0;
    $scope.itemCount = 0;
    $scope.finish = false;
    $scope.products = new Array();
    $scope.percent = 0;
    $scope.stop = false;
    $rootScope.mainTitle = $scope.percent+"%";
    index = true;
    var end = false;
    var i=0;
    $scope.indexManual();

    //function to get only the selected items
    $scope.getItems = function(products){
      var items = new Array();
      var control = true;
      if($rootScope.Params.isSelected){
        for(var i=0; i<products.length; i++){
          control = true;
          for(var j=0; j<$rootScope.Params.noSelected.length; j++){
            if(products[i].id == $rootScope.Params.noSelected[j]){
              control = false;
              break;
            }
          }
          if(control){
            items.push(products[i]);
          }
        }
      }
      else{
        var tmp = new Array();
        var k=0;
        for(var j=0; j<$rootScope.Params.Selected.length; j++){
            if($rootScope.Params.Selected[j] != null){
              tmp[k] = {
                id: $rootScope.Params.Selected[j],
                name: null
              };
              items.push(tmp[k]);
              k++;
            }
        }
      }
      return items;
    }
    //end of the function

    if($rootScope.Params.isSelected){
      $http.post(API.base_url + API.ready_clean, $rootScope.Collections).success(function(data){
        $scope.ready = data.ready;
        $scope.pAction = $scope.getItems(data.products);
        $scope.count = $scope.pAction.length;
        if($scope.ready){ 
          selectedAllPost(i);
        }
    	 }).error(function(data) {
    	  	console.log("Web service error");
    	 });
    }
    else{
      $scope.ready = true;
      $scope.pAction = $scope.getItems($scope.products);
      $scope.count = $scope.pAction.length;
      noSelectedPost(i);
    }

    function selectedAllPost(i){
      formData.productId = $scope.pAction[i].id;
      formData.index = i;
      $http.post(API.base_url + API.actions, formData).success(function(response) {
          if($scope.itemCount<50)
            $scope.products[$scope.itemCount] = $scope.pAction[i];
          $scope.percent = Math.round(($scope.itemCount/($scope.count-1))*100);
          $scope.itemCount++;
          
          if($scope.itemCount==$scope.pAction.length)
            $scope.finish = true;

          $rootScope.mainTitle = $scope.percent+"%";
          i++;

          if($scope.stop)
            return true;

          if(i<$scope.pAction.length)
            selectedAllPost(i);              
      });
    }

    function noSelectedPost(i){
      formData.productId = $scope.pAction[i].id;
      formData.index = i;
      $http.post(API.base_url + API.actions, formData).success(function(response) {
        if($scope.itemCount<50)
          $scope.products[$scope.itemCount] = {
              id: response.id,
              name: response.name
          };
        $scope.percent = Math.round(($scope.itemCount/($scope.count-1))*100);
        $scope.itemCount++;
        $rootScope.mainTitle = $scope.percent+"%";    
        i++;

        if($scope.itemCount==$scope.pAction.length)
           $scope.finish = true;

         if($scope.stop)
          return true;


        if(i<$scope.pAction.length)
          noSelectedPost(i);        
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

    $scope.indexManual = function(){
      var action = {action: "--mode-manual"};
      $http.post(API.base_url + API.actions, action).success(function(data) {
          if(data.status)
            {
                $scope.alertas = [
          { type: 'success', msg: 'Indexes were successfully changed to Manual update' }];          
      }
           }).error(function(data) {
              console.log("Web service error");
      });
    }

  });