myapp.controller('UpdateBestSellerNovelCtrl', function ($scope, $http, $routeParams, $location, MService) {
    console.log("UpdateBestSellerNovelCtrl");
    
    console.log($routeParams);
    
    $scope.id = $routeParams.id;
    console.log("$routeParams.id = " + $routeParams.id);
    
    $scope.book = MService.emptyNovel();
    $scope.myErrors = MService.emptyNovel();
    
    var url = "webAPIs/getBestSellerNovelAPI.jsp?id=" + $routeParams.id;
    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Book Update (get) ajax success");
                console.log(response);
                console.log("");
                $scope.book = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Book Update (get) ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

    //Create a new person (this is the Insert/Save button)
    $scope.updateSave = function () {
        console.log("updating novel");
        console.log($scope.book);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = MService.emptyNovel();

        var myData = JSON.stringify($scope.book);
        var url = "webAPIs/updateBestSellerNovelAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Book Update AJAX success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Book Sucessfully Updated";
                    }
                    $location.path('#/');
                },
                function (response) { // this function will run if http.get error
                    console.log("Book Update ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller