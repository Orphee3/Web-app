/**
 * Created by superphung on 8/4/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$auth', '$window', '$location', 'authservice', '$rootScope', 'socketservice'];

    function LoginCtrl($auth, $window, $location, authservice, $rootScope, socketservice) {
        var vm = this;

        vm.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (response) {
                    $window.localStorage.currentUser = JSON.stringify(response.data.user);
                    socketservice.connect();
                    //$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    console.log(response.data.token);
                })
                .catch(function () {
                    $auth.logout();
                });
        };

        vm.loginLocal = function () {
            console.log('login !!');
            return authservice.loginLocal(vm.user)
                .then(function (data) {
                    console.log('haha got a token');
                    console.log(data.token);
                    $auth.setToken(data.token, true);
                    $window.localStorage.currentUser = JSON.stringify(data.user);
                    socketservice.connect();
                    //$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    //$rootScope.currentUser = data.user;
                    $location.url('/');
                });

        };
    }
})();