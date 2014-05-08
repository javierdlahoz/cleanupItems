function UsersLoginController($scope, $http, $location, $route, $rootScope){
	$scope.validate_user = function(){
		$http.post(getDir()+"Users/login.json", {
				email: $scope.username,
				password: $scope.password,
			}).success(function(data) {
			      $scope.response = data.response;
			      console.log($scope.response.status);
			      if($scope.response.status==true){
			      		$location.path("users/dashboard");
			      }
			      else
			      {
			      		showError("Verifica tus datos e intenta nuevamente");
			      }
			      $rootScope.$broadcast('event:menu-success', $scope.response.status);
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
			  	});
			  }
}

function UsersLogoutController($scope, $http, $location,$rootScope){
	$http.get(getDir()+"Users/logout.json").success(function(data) {
			      $scope.response = data.response;
			      $rootScope.$broadcast('event:menu-success', false);
			      $location.path("");
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});
}

function UsersDashboardController($scope, $http, $location){
	$http.get(getDir()+"Users/getData.json").success(function(data) {			      
			      $scope.user = data.response.user;
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});
}

function UsersEditController($scope, $http, $location){
	$scope.status = true;

	$http.get(getDir()+"Users/getData.json").success(function(data) {			      
			      $scope.user = data.response.user;
			      $scope.firstName = $scope.user.firstName;
			      $scope.lastName = $scope.user.lastName;
			   	  $scope.idUser = $scope.user.id;
			   	}).error(function(data) {
			  		console.log("error en el servicio web");
	});

 	$scope.validatePassword = function(){
 		$http.post(getDir()+"Users/validatePassword.json", {
				password: $scope.old_password
			}).success(function(data) {
			      $scope.response = data.response;
				
					if($scope.response!=undefined){		  	
				      if($scope.response.status==true){
				      		showSuccess("Contraseña correcta");
				      }
				      else{
				      		showError("Verifica tu anterior contraseña");
				      }
			  			$scope.status = $scope.response.status;
			  		}
			  		else{
			  			$scope.status = false;
			  			showError("Tu anterior contraseña no puede estar vacía");
			  		}
			  	}).error(function(data) {
			  		$scope.status = false;
			  		console.log("error en el servicio web");
			  	});
			  };

	$scope.changeStatus = function(){
		if(!$scope.change_password){
			$scope.status = false;
		}
		else
			$scope.status = true;
		console.log($scope.status);
	};

	$scope.validateNewPassword = function(){
		if($scope.change_password){
			if(($scope.password == $scope.password2)&&($scope.password!=null)){
				showSuccess("Todo OK");
			}
			else{
				showError("Tu nueva contraseña no coincide o está vacía");
			}
		}
	};

	$scope.send = function(){
		$http.post(getDir()+"Users/save.json", {
				id: $scope.idUser,
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				password: $scope.password

		}).success(function(data) {
		      $scope.response = data.response;
		      if($scope.response.status)
		      	{	
		      	   showError("Sus datos ha sido modificada");
		      	   setTimeout($location.path("users/dashboard"), 4000);

		      	}
		  	}).error(function(data) {
		  		console.log("error en el servicio web");
		  	});
	};
}


function UsersForget($scope, $http){
	$scope.forgotPassword = function(){
	$http.post(getDir()+"customer?method=forgotPassword", {
				email: $scope.email
		}).success(function(data) {
		      console.log(getResponseTag(data));
		      $scope.response = getResponseTag(data);
		  	}).error(function(data) {
		  		console.log("error en el servicio web");
		  	});
	};

	$scope.resetPassword = function(){
		$http.post(getDir()+"customer?method=resetPassword", {
				id: "2",
				token: "82d27b471487824c329530c1ebcdb903",
				password: $scope.new_password
		}).success(function(data) {
		      console.log(getResponseTag(data));
		      $scope.response = getResponseTag(data);
		  	}).error(function(data) {
		  		console.log("error en el servicio web");
		  	});
	}
}

function UsersSignUp($scope, $http, $location){

	$scope.createCustomer = function(){
		$http.post(getDir()+"Users/save.json", {
				
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				email: $scope.email,
				password: $scope.password

		}).success(function(data) {
		      $scope.response = data.response;
		      if($scope.response.status)
		      	{	
		      	   showError("Su cuenta de usuario ha sido creada");
		      	   setTimeout($location.path("users"), 4000);

		      	}
		  	}).error(function(data) {
		  		console.log("error en el servicio web");
		  	});
	}
}

function UsersAddress($scope, $http, $location){
	$http.get(getDir()+"index?method=getSettings").success(function(data) {
			      $scope.response = getResponseTag(data);
			      console.log($scope.response);
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});

	$scope.addAddress = function(){
		country_tmp = $scope.country_select.value;
		
		if($scope.region_select)
			region_tmp = $scope.region_select.value;
		else
			region_tmp = "";

		$http.post(getDir()+"customer?method=saveAddress", {	
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				company: $scope.company,
				telephone: $scope.telephone,
				fax: $scope.fax,
				street_address: $scope.street_address,
				street_address2: $scope.street_address2,
				zip: $scope.zip,
				country: country_tmp,
				region: region_tmp,
				city: $scope.city,
				billing_address: $scope.billing_address,
				shipping_address: $scope.shipping_address
				
		}).success(function(data) {
		      $scope.response = getResponseTag(data);
		      if($scope.response.status){
		      		$location.path("users/address");
		      }
		      else{
		      		showError("Please check your address info");
		      }
		  	}).error(function(data) {
		  		console.log("error en el servicio web");
		  	});
	}
}

function leftMenuController($scope, $http, $location) {
    $http.get(getDir()+"Users/isLoggedIn.json").success(function(data) {		      
			      $scope.response = data.response;
			      $scope.loggedIn = $scope.response.status;
			      if(!$scope.loggedIn)
			      {
			      	$location.path("");
			      }
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
			  	});
}

function UsersDeleteAddress($scope, $http, $location, $routeParams){
	$http.get(getDir()+"customer?method=deleteAddress&id="+$routeParams.id).success(function(data) {
			      $scope.response = getResponseTag(data);
			      $scope.status = $scope.response.status;
			      if($scope.status){
			      	$location.path("users/address");
			      }
			      else{
			      	$location.path("users/address");
			      	showError("We can't delete the address at this moment, please try again in a few minutes");
			      }
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});
}

function UsersEditAddress($scope, $http, $location, $routeParams){
	$http.get(getDir()+"index?method=getSettings").success(function(data) {
			      $scope.settings = getResponseTag(data);
			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});

	$http.get(getDir()+"customer?method=getAddressData&id="+$routeParams.id).success(function(data) {
			      $scope.response = getResponseTag(data);
			      console.log($scope.response);
			      $scope.firstName = $scope.response.firstName;
			      $scope.lastName = $scope.response.lastName;
			      $scope.city = $scope.response.city;
			      $scope.country_select = $scope.response.country;
			      $scope.street_address = $scope.response.street1;
			      $scope.street_address2 = $scope.response.street2;
			      $scope.region_select = $scope.response.region;
			      $scope.company = $scope.response.company;
			      $scope.zip = $scope.response.zip;
			      $scope.telephone = $scope.response.telephone;
			      $scope.fax = $scope.response.fax;
			      $scope.shipping_address = $scope.response.isShippingAddress;
			      $scope.billing_address = $scope.response.isBillingAddress;

			  	}).error(function(data) {
			  		console.log("error en el servicio web");
	});
}