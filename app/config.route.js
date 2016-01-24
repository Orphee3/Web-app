(function () {
    'use strict';

    angular
        .module('orphee-app')
        .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl as home'
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl as log'
            })
            .when('/signUp', {
                templateUrl: '/app/signup/signup.html',
                controller: 'SignUpCtrl as signup'
            })
            .when('/profile', {
                templateUrl: '/app/profile/profile.html',
                controller: 'ProfileCtrl as profile'
            })
            .when('/profile/:id', {
                templateUrl: '/app/profile/profileDetail.html',
                controller: 'ProfileDetailCtrl as profileDetail'
            })
            .when('/chatlist', {
                templateUrl: 'app/chat/chatlist.html',
                controller: 'ChatListCtrl as chatlist'
            })
            .when('/createroom', {
                templateUrl: 'app/chat/createroom.html',
                controller: 'CreateRoomCtrl as create'
            })
            .when('/chat', {
                templateUrl: 'app/chat/chat.html',
                controller: 'ChatCtrl as chat'
            })
            .when('/moments', {
                templateUrl: 'app/moments/moments.html',
                controller: 'MomentsCtrl as moment'
            })
            .otherwise({
                redirectTo: '/'
            });


        /*$urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl as home'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl as log'
            });*/

    });
})(); 
