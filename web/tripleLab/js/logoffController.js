myapp.controller('LogoffCtrl', function($scope, $http, $location){
   console.log("LogoffCtrl");
   
   $http.get("webAPIs/logoffAPI.jsp");
   
   $scope.status = "Successfully Logged Off";
   
   $location.path("#/home");
});