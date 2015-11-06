login.controller('defaultCtrl', function ($scope) {


  })
  .controller('loginCtrl', function ($http,$timeout,$scope,loginSvc,$window,$state) {
  socket = io();
			
				socket.on('socket', function(data){
					sid=data;
				});
			$timeout(function() {
			$http.post("/store/session",{'msg':sid})
				.success( function(response)
					{
						console.log("success IN SOCKET ID");
					}
				);
				},2000);
				socket.on('response', function(data){
					$scope.response=data.reply;
					if(data.reply=="Found")
					{
						//alert("founded");
							$state.go("/");
						$window.location.reload();
					}
				});
  
    $scope.email=null;
	$scope.password=null;
	$scope.showModal = false;
    $scope.popup_show = function(){
        $scope.showModal = !$scope.showModal;
    };
	$scope.popup_close=function(){
		$scope.showModal = false;
	}
	$scope.login=function(){
		loginSvc.readOneData().save({
			email: $scope.email,
			password: $scope.password
		});
		//alert("reloading");
		
	//	$state.go("/");
		//$window.location.reload();
		
	}
  })
  .controller('register_newCtrl', function ($scope,$state,defaultSvc) {
	$scope.firstName=null;
	$scope.lastName=null;
	$scope.phone=null;
	$scope.email=null;
	$scope.password=null;
	$scope.register_now=function(){
		defaultSvc.readOneData().save({
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			phone: $scope.phone,
			email: $scope.email,
			password: $scope.password
		});
		$state.go("login");		
	}
  });