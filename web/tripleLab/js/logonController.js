myapp.controller('LogonCtrl', function($scope, $http, MService){
    console.log("LogonCtrl");
    
    $scope.user_email = "";
    $scope.user_password = "";
    
    $scope.user = MService.emptyUser();
    $scope.myErrors = MService.emptyUser();
    
    $scope.logon = function(){
        $scope.myErrors = MService.emptyUser();
        $scope.user_email = $scope.user.user_email;
        $scope.user_password = $scope.user.user_password;
        
        console.log("user_email: " + $scope.user_email + " user_password: " + $scope.user_password);
        
        var url = "webAPIs/logonAPI.jsp?user_email=" + $scope.user_email + "&user_password=" + $scope.user_password;
        console.log("url: " + url);
        $http.get(url).then(
                function(response){
                    console.log("Logon GET Success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if($scope.myErrors.errorMsg.length === 0){
                        $scope.status = "Logon Successful";
                    }
                },
                function(response){
                    console.log("Logon AJAX error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;
                }
        );
    };
});