myapp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'htmlPartials/bestSellerNovelsList.html',
                controller: 'BestSellerBooksCtrl'
            }).
            when('/home', {
                templateUrl: 'htmlPartials/bestSellerNovelsList.html',
                controller: 'BestSellerBooksCtrl'
            }).
            when('/users', {
                templateUrl: 'htmlPartials/userList.html',
                controller: 'UserListCtrl'
            }).
            when('/register', {
                templateUrl: 'htmlPartials/registerUser.html',
                controller: 'RegisterUserCtrl'
            }).
            when('/insertNovel', {
                templateUrl: 'htmlPartials/insertNovel.html',
                controller: 'InsertBestSellerNovelCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
});