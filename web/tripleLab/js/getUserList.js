myapp.controller('UserListCtrl', function($scope, $http){
    $http.get('webAPIs/getUserListAPI.jsp').then(function(response){
        console.log("AJAX Call Successfull while Getting User List");
        console.log(response);
        console.log("");
        $scope.users = response.data.recordList;
    }, function(response){
        console.log("AJAX Call Failed while Getting User List");
        console.log(response);
        console.log("");
    });
});