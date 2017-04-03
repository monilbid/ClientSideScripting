myapp.controller('RegisterUserCtrl', function ($scope, $http, MService) {
    console.log("RegisterUserCtrl");
    
    $scope.newuser = MService.emptyUser();
    $scope.myErrors = MService.emptyUser();

    //Create a new person (this is the Insert/Save button)
    $scope.insertSave = function () {
        console.log("creating user");
        console.log($scope.newuser);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = MService.emptyUser();

        var myData = JSON.stringify($scope.newuser);
        var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Person Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Person Sucessfully Inserted";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Person Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller