myapp.controller('BestSellerBooksCtrl', function($scope, $http){
    $http.get('webAPIs/getBestSellerNovelsListAPI.jsp').then(function(response){
        console.log("AJAX Call Successfull while Getting Books List");
        console.log(response);
        console.log("");
        $scope.books = response.data.recordList;
        
        for(var i = 0; i < $scope.books.length; i++){
            $scope.books[i].num_id = Number($scope.books[i].id);
            $scope.books[i].num_year_published = parseInt($scope.books[i].year_published.replace(/\,/g,''));
            if($scope.books[i].price){
                $scope.books[i].num_price = parseFloat($scope.books[i].price.replace(/\$/g, ''));
            }
        }
    }, function(response){
        console.log("AJAX Call Failed while Getting Books List");
        console.log(response);
        console.log("");
    });
    
    $scope.sortField = 'num_id';
    $scope.reverse = true;
});