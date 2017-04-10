myapp.controller('BestSellerNovelDetailsCtrl', function ($scope, $http, $routeParams) {
    console.log("BestSellerNovelDetailsCtrl");
    console.log($routeParams);
    $scope.id = $routeParams.id;
    var url = "webAPIs/getBestSellerNovelAPI.jsp?id=" + $routeParams.id;

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Book Detail ajax success");
                console.log(response);
                console.log("");
                $scope.book = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Book Detail ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

});