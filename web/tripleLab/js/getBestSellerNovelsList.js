myapp.controller('BestSellerBooksCtrl', function($scope, $http){
    $http.get('webAPIs/getBestSellerNovelsListAPI.jsp').then(function(response){
        console.log("AJAX Call Successfull while Getting Books List");
        console.log(response);
        console.log("");
        $scope.books = response.data.recordList;
    }, function(response){
        console.log("AJAX Call Failed while Getting Books List");
        console.log(response);
        console.log("");
    });
    
    $scope.sortField = 'id';
    $scope.reverse = true;
});