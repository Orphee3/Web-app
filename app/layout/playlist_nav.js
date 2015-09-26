/**
 * Created by superphung on 9/1/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('PlaylistNavCtrl', PlaylistNavCtrl);

    PlaylistNavCtrl.$inject = ['$q', 'navservice', 'playlistservice', '$scope', 'audioservice'];

    function PlaylistNavCtrl($q, navservice, playlistservice, $scope, audioservice) {
        var vm = this;

        vm.playlist = [];
        //vm.currentPlaylist = [];
        //$scope.currentPlaylist = [];

        vm.isOpen = isOpen;
        vm.deleteTrackFromPlaylist = deleteTrackFromPlaylist;
        vm.play = play;

        $scope.$on('song start !', function (e, args) {
            console.log('song start ' + args.name);
            vm.trackActive = args.trackActive;
            vm.trackModel = $scope.currentPlaylist[vm.trackActive];
        });

        $scope.$on('refresh playlist', function () {
            console.log('receive on refresh playlist');
            activate();
        });

        vm.getIndex = function (track) {
            //console.log('trackActive', vm.trackActive);
            //console.log('index track', $scope.currentPlaylist.indexOf(track));
            return $scope.currentPlaylist.indexOf(track);
        };

        $scope.$watchCollection('currentPlaylist', function (n, o) {
            playlistservice.updatePlaylist(n).then(function (data) {
                if (data === 'update' && vm.trackModel) {
                    var id = $scope.currentPlaylist.indexOf(vm.trackModel);
                    if (id <= -1) {
                        return;
                    }
                    if (audioservice.getSongIndex() !== id) {
                        audioservice.setSongIndex(-audioservice.getSongIndex() + id);
                        vm.trackActive = audioservice.getSongIndex();
                        vm.trackModel = $scope.currentPlaylist[vm.trackActive];
                    }
                }
            });
        });

        vm.test = function () {
            //console.log(vm.currentPlaylist);
            console.log($scope.currentPlaylist);
        };

        activate();

        function isOpen() {
            return navservice.getSideNavState('playlist');
        }

        function activate() {
            var promises = [getPlaylist(), getPlaylistActive()];

            return $q.all(promises)
                .then(function () {
                    //vm.currentPlaylist = vm.playlist[vm.selectedList];
                    if (!$scope.currentPlaylist) {
                        $scope.currentPlaylist = vm.playlist[vm.selectedList];
                    } else {
                        $scope.currentPlaylist.length = 0;
                        $scope.currentPlaylist.push.apply($scope.currentPlaylist, vm.playlist[vm.selectedList]);
                    }
                    //$scope.currentPlaylist = vm.playlist[vm.selectedList];
                    console.log('activated playlist nav');
                });
        }

        function deleteTrackFromPlaylist(track) {
            var id = $scope.currentPlaylist.indexOf(track);
            if (id !== -1) {
                playlistservice.deleteFromPlaylist(id);
                if (audioservice.getSongIndex() === id) {
                    audioservice.setSongIndex(-1);
                }
                activate();
            }
        }

        function play(track) {
            var id = $scope.currentPlaylist.indexOf(track);
            if (id === -1) id = 0;
            audioservice.addPlayList($scope.currentPlaylist, id);
        }

        vm.setPlay = function () {
            audioservice.setPlay();
        };

        /**
         * @private
         * @returns {Q.IPromise<U>|Q.Promise<U>|angular.IPromise<TResult>|*}
         */
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