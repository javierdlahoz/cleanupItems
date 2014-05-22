'use strict';

angular.module('myApp')
    .controller('ListController', function ($scope, $http, $rootScope, $location, $modal, API) {
        if(API.getAv()){
            $location.path("/");
        }
        else{
            $scope.sorting = 'id';
        $scope.typeSort = 'DESC';
        $scope.visible = true;
        $scope.pageLength = 50;
        $scope.currentPage = 1;
        $scope.pageStatus = false;
        $scope.catStatus = true;
        $scope.Selected = new Array();
        $scope.noSelected = new Array();
        $scope.loader = false;
        $scope.max = false;

        if($rootScope.categories == null)
        {	$scope.catStatus = false;
            $http.get(API.base_url + API.categories).success(function(data) {
                $scope.categories = data;
                $rootScope.categories = $scope.categories;
                $scope.catStatus = true;
            }).error(function(data) {
                console.log("Web service error");
            });
        }
        $scope.categories = $rootScope.categories;

        $scope.init = function(){
            $scope.loader = true;
            $scope.actiongo = true;
            $http.post(API.base_url + API.filter, $rootScope.Params).success(function(data) {

                $scope.products = data[0].products;
                $scope.status = true;
                $scope.count = data[0].products.length;
                $scope.total = data[1].count;
                if($scope.total>250000)
                	$scope.max = true;
                if($scope.total>0){
                    $scope.visible = true;
                    if($scope.total>$rootScope.Params.pageLength)
                        $scope.pageStatus = true;
                    else
                        $scope.pageStatus = false;
                    $scope.showSelected();
                }
                else
                    $scope.visible = false;

                $scope.loader = false;
                $scope.actiongo = false;

            }).error(function(data) {
                console.log("Web service error");
            });
        }

        $scope.init();

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

        $scope.idDesc = function(){
            $rootScope.Params.sortBy = 'entity_id';
            $rootScope.Params.sortType = 'DESC';
            $scope.init();
        };

        $scope.idAsc = function(){
            $rootScope.Params.sortBy = 'entity_id';
            $rootScope.Params.sortType = 'ASC';
            $scope.init();
        };

        $scope.nameDesc = function(){
            $rootScope.Params.sortBy = 'name';
            $rootScope.Params.sortType = 'DESC';
            $scope.init();
        };

        $scope.nameAsc = function(){
            $rootScope.Params.sortBy = 'name';
            $rootScope.Params.sortType = 'ASC';
            $scope.init();
        };

        $scope.skuDesc = function(){
            $rootScope.Params.sortBy = 'sku';
            $rootScope.Params.sortType = 'DESC';
            $scope.init();
        };

        $scope.skuAsc = function(){
            $rootScope.Params.sortBy = 'sku';
            $rootScope.Params.sortType = 'ASC';
            $scope.init();
        };

        $scope.statusDesc = function(){
            $rootScope.Params.sortBy = 'status';
            $rootScope.Params.sortType = 'DESC';
            $scope.init();
        };

        $scope.statusAsc = function(){
            $rootScope.Params.sortBy = 'status';
            $rootScope.Params.sortType = 'ASC';
            $scope.init();
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

        $scope.ten = function(){
            $rootScope.Params.pageLength = 10;
            $rootScope.Params.currentPage = 1;
            $scope.init();
        }

        $scope.fifty = function(){
            $rootScope.Params.pageLength = 50;
            $rootScope.Params.currentPage = 1;
            $scope.init();
        }

        $scope.houndred = function(){
            $rootScope.Params.pageLength = 100;
            $rootScope.Params.currentPage = 1;
            $scope.init();
        }

        //MODAL FUNCTIONS
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size
            });
        };
        }
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
