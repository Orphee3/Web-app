/**
 * Created by superphung on 8/9/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('SideNavMenuCtrl', SideNavMenuCtrl);

    SideNavMenuCtrl.$inject = ['$auth', 'navservice', '$rootScope'];

    function SideNavMenuCtrl($auth, navservice, $rootScope) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.isOpen = isOpen;
        vm.toggleFriendNav = toggleFriendNav;

        function isOpen() {
            return navservice.getSideNavState('menu');
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function toggleFriendNav() {
            console.log('toggle friend nav');
            navservice.setSideNavState('friends');
            console.log(navservice.getSideNavState('friends'));
            $rootScope.$broadcast('refresh nav');
        }
    }

})();

