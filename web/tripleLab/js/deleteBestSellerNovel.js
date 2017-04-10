myapp.controller('DeleteBestSellerNovelCtrl', function ($scope, $http, $routeParams, $location) {
    var url = "webAPIs/deleteBestSellerNovelAPI.jsp?id=" + $routeParams.id;
    console.log("url to invoke: " + url);
    $scope.deleteMsg = "";

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Book Delete ajax success");
                console.log(response);
                console.log("");
                $scope.deleteMsg = response.data.errorMsg;
                if ($scope.deleteMsg.length === 0) {
                    $scope.deleteMsg = "Sucessfully deleted person " + $routeParams.id;
                } else {
                    $scope.deleteMsg = "Delete Error: " + $scope.deleteMsg;
                }
                $location.path("#/");
            },
            function (response) { // this function will run if http.get error
                console.log("Book Delete ajax error");
                console.log(response);
                console.log("");
                $scope.deleteMsg = "Delete Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

});