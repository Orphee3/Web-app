/**
 * Created by superphung on 8/5/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('TopNavCtrl', TopNavCtrl);

    TopNavCtrl.$inject = ['$auth', '$window', '$mdSidenav', 'navservice', 'socketservice'];

    function TopNavCtrl($auth, $window, $mdSidenav, navservice, socketservice) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.logout = logout;
        vm.toggleSideNavMenu = toggleSideNavMenu;

        //pull user info for nav top
        vm.getUserImage = getUserImage;
        vm.getUserName = getUserName;

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function logout() {
            navservice.closeAllNav();
            socketservice.disconnect();
            $auth.logout();
            delete $window.localStorage.currentUser;
            $window.location.reload();
        }

        function toggleSideNavMenu() {
            navservice.setSideNavState('menu');
        }

        function getUserImage() {
            return JSON.parse($window.localStorage.currentUser).picture;
        }

        function getUserName() {
            return JSON.parse($window.localStorage.currentUser).name;
        }
    }

})();