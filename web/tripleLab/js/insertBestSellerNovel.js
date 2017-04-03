myapp.controller('InsertBestSellerNovelCtrl', function ($scope, $http, MService) {
    console.log("InsertBestSellerNovelCtrl");
    
    $scope.newbook = MService.emptyNovel();
    $scope.myErrors = MService.emptyNovel();

    //Create a new person (this is the Insert/Save button)
    $scope.insertSave = function () {
        console.log("creating novel");
        console.log($scope.newbook);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = MService.emptyNovel();

        var myData = JSON.stringify($scope.newbook);
        var url = "webAPIs/insertBestSellerNovelAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Novel Insert/Save AJAX success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Novel Sucessfully Inserted";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Novel Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller