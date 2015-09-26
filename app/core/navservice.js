/**
 * Created by superphung on 8/9/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('navservice', navservice);

    function navservice() {
        var vm = this;

        vm.menu = true;
        vm.friends = false;
        vm.playlist = false;

        var service = {
            setSideNavState: setSideNavState,
            getSideNavState: getSideNavState,
            closeAllNav: closeAllNav
        };

        return service;

        function closeAllNav() {
            vm.friends = false;
            vm.playlist = false;
        }

        function setSideNavState(sideNav) {
            vm[sideNav] = !vm[sideNav];
        }

        function getSideNavState(sideNav) {
            return vm[sideNav];
        }
    }
})();