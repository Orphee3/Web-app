/**
 * Created by superphung on 11/8/15.
 */

(function () {
    angular
        .module('orphee-app')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$auth', '$window', '$location', 'authservice', 'socketservice'];

    function SignUpCtrl($auth, $window, $location, authservice, socketservice) {
        var vm = this;

        vm.signUpLocal = signUpLocal;

        function signUpLocal() {
            if (!vm.user.username || !vm.user.name || !vm.user.password || !vm.user.confirmPassword) return;
            if (JSON.stringify(vm.user.password) !== JSON.stringify(vm.user.confirmPassword)) return;
            return authservice.signUpLocal(vm.user)
                .then(function (data) {
                    $auth.setToken(data.token, true);
                    $window.localStorage.currentUser = JSON.stringify(data.user);
                    socketservice.connect();
                    $location.url('/');
                });
        }
    }
})();