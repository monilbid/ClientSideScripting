var myapp = angular.module('myApp', ['ngRoute']);

myapp.factory("MService", function () {

    var emptyUser = function () {
        return {
            user_email: "",
            user_password: "",
            user_name: "",
            user_role: ""
        };
    };
    
    var emptyNovel = function() {
        return {
            title: "",
            image_url: "",
            author: "",
            isbn: "",
            year_published: "",
            price: ""
        };
    };

    return {
        emptyUser: emptyUser,
        emptyNovel: emptyNovel
    };

});
