/**
 * Created by superphung on 8/5/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$q', '$auth', '$window', 'audioservice', 'dataservice', 'playlistservice', '$rootScope', 'animation', '$scope'];

    function HomeCtrl($q, $auth, $window, audioservice, dataservice, playlistservice, $rootScope, animation, $scope) {
        var vm = this;

        vm.creations = [];
        vm.comments = [];
        //vm.search = '';
        vm.isAuthenticated = isAuthenticated;
        vm.playCurrent = playCurrent;
        vm.addToPlaylist= addToPlaylist;

        vm.showDetails = showDetails;
        vm.hideDetails = hideDetails;

        vm.addComment = addComment;

        $rootScope.$on('search creations', function (e, data) {
            vm.search = data;
        });

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

        function showDetails(e, tile) {
            vm.circleStyle = {
                "position": "absolute",
                "left": e.x - 338/2,
                "top": e.y - 338/2
            };
            vm.currentDetail = tile;

            dataservice.getCreationComments(vm.currentDetail._id)
                .then(function (data) {
                    vm.comments = data;
                });
            animation.zoom();
        }

        function hideDetails() {
            animation.dezoom();
        }

        function addComment() {
            vm.user = JSON.parse($window.localStorage.currentUser);
            vm.comments.unshift({
                creator: {
                    name: vm.user.name,
                    picture: vm.user.picture
                },
                message: vm.comment,
                dateCreation: moment(new Date()).calendar()
            });
            dataservice.createComment(vm.currentDetail._id, vm.user._id, vm.comment);
            vm.comment = '';
        }
    }

})();