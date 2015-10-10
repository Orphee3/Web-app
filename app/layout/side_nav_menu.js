/**
 * Created by superphung on 8/9/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('SideNavMenuCtrl', SideNavMenuCtrl);

    SideNavMenuCtrl.$inject = ['$q', '$auth', 'navservice', '$rootScope', 'playlistservice'];

    function SideNavMenuCtrl($q, $auth, navservice, $rootScope, playlistservice) {
        var vm = this;

        vm.playlist = [];

        vm.isAuthenticated = isAuthenticated;
        vm.isOpen = isOpen;
        vm.toggleFriendNav = toggleFriendNav;
        vm.togglePlaylistNav = togglePlaylistNav;

        vm.selectPlaylist = selectPlaylist;
        vm.addPlaylist = addPlaylist;

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

        function togglePlaylistNav() {
            console.log('toggle playlist nav');
            navservice.setSideNavState('playlist');
        }

        /**
         *
         * @param id
         */
        function selectPlaylist(id) {
            playlistservice.setPlaylistActive(id);
            vm.selectedList = id;
            $rootScope.$broadcast('refresh playlist');
        }

        function addPlaylist() {
            playlistservice.addPlaylist();
            activate();
        }

        activate();

        function activate() {
            var promises = [getPlaylist(), getPlaylistActive()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated menu nav');
                });
        }

        function getPlaylist() {
            return playlistservice.getPlaylist()
                .then(function (data) {
                    vm.playlist = data;
                    return vm.playlist;
                });
        }

        function getPlaylistActive() {
            return playlistservice.getPlaylistActive()
                .then(function (data) {
                    vm.selectedList = data;
                    return vm.selectedList;
                });
        }
    }

})();

