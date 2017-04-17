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
            when('/updateNovel/:id', {
                templateUrl: 'htmlPartials/updateBestSellerNovel.html',
                controller: 'UpdateBestSellerNovelCtrl'
            }).
            when('/novelDetails/:id', {
                templateUrl: 'htmlPartials/viewBestSellerNovelDetails.html',
                controller: 'BestSellerNovelDetailsCtrl'
            }).
            when('/deleteNovel/:id', {
                templateUrl: 'htmlPartials/bestSellerNovelsList.html',
                controller: 'DeleteBestSellerNovelCtrl'
            }).
            when('/logon', {
                templateUrl: 'htmlPartials/logon.html',
                controller: 'LogonCtrl'
            }).
            when('/logoff', {
                templateUrl: 'htmlPartials/bestSellerNovelsList.html',
                controller: 'LogoffCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
});