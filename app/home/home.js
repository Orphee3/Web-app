/**
 * Created by superphung on 8/5/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$q', '$auth', '$window', 'audioservice', 'dataservice', 'playlistservice', '$rootScope'];

    function HomeCtrl($q, $auth, $window, audioservice, dataservice, playlistservice, $rootScope) {
        var vm = this;

        vm.creations = [];
        vm.isAuthenticated = isAuthenticated;
        vm.playCurrent = playCurrent;
        vm.addToPlaylist= addToPlaylist;

        activate();

        function activate() {
            var promises = [getPopularCreation()];

            $q.all(promises)
                .then(function () {
                    console.log('activated home page');
                    console.log(vm.creations);
                });
        }

        function getPopularCreation() {
            return dataservice.getPopularCreation()
                .then(function (data) {
                    vm.creations = data;
                    return vm.creations;
                });
        }

        function isAuthenticated() {
            //return $window.sessionStorage.token;
            return $auth.isAuthenticated();
        }

        function playCurrent(url) {
            audioservice.play(url);
        }

        function addToPlaylist(creation) {
            playlistservice.addToPlaylist(creation);
            $rootScope.$broadcast('refresh playlist');
        }
    }

})();