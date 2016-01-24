/**
 * Created by superphung on 1/21/16.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('ProfileDetailCtrl', ProfileDetailCtrl);

    ProfileDetailCtrl.$inject = ['$rootScope', '$routeParams', '$auth', '$window', 'audioservice', 'playlistservice', 'dataservice', 'animation'];

    function ProfileDetailCtrl($rootScope, $routeParams, $auth, $window, audioservice, playlistservice, dataservice, animation) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;

        vm.playCurrent = playCurrent;
        vm.addToPlaylist = addToPlayList;

        vm.addComment = addComment;

        vm.showDetails = showDetails;
        vm.hideDetails = hideDetails;

        activate();

        function activate() {
            return dataservice.getById($routeParams.id)
                .then(function (user) {
                    vm.user = user;
                    return dataservice.getUserCreations($routeParams.id);
                })
                .then(function (creations) {
                    vm.creations = creations;
                });
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function playCurrent(url) {
            audioservice.play(url);
        }

        function addToPlayList(creation) {
            playlistservice.addToPlayList(creation);
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