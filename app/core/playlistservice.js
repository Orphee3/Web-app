/**
 * Created by superphung on 9/1/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('playlistservice', playlistservice);

    playlistservice.$inject = ['$q', '$window'];

    function playlistservice($q, $window) {
        var vm = this;

        var service = {
            getPlaylist: getPlaylist,
            addPlaylist: addPlaylist,

            setPlaylistActive: setPlaylistActive,
            getPlaylistActive: getPlaylistActive,

            addToPlaylist: addToPlaylist,
            updatePlaylist: updatePlaylist,
            deleteFromPlaylist: deleteFromPlaylist
        };

        return service;

        function getPlaylist() {
            //if ($window.localStorage.currentUser) {
                //get playlist from db
            //} else {
                if (!$window.localStorage.playlist) {
                    $window.localStorage.playlist = JSON.stringify([]);
                }
                return $q.when(JSON.parse($window.localStorage.playlist));
            //}
        }

        function addPlaylist() {
            //if ($window.localStorage.currentUser) {

            //} else {
                var playlist = JSON.parse($window.localStorage.playlist);
                playlist.push([]);
                $window.localStorage.playlist = JSON.stringify(playlist);
            //}
        }

        function setPlaylistActive(id) {
            $window.localStorage.playlist_active = JSON.stringify(id);
        }

        function getPlaylistActive() {
            addPlaylistActive();
            return $q.when(JSON.parse($window.localStorage.playlist_active) >> 0);
        }

        function addToPlaylist(creation) {
            //if ($window.localStorage.currentUser) {

            //} else {
                var id = JSON.parse($window.localStorage.playlist_active) >> 0;
                var playlist = JSON.parse($window.localStorage.playlist);
                playlist[id].push({
                    id: creation._id,
                    name: creation.name,
                    picture: creation.picture,
                    url: creation.url,
                    creator: creation.creator
                });
                $window.localStorage.playlist = JSON.stringify(playlist);
            //}
        }

        function updatePlaylist(currentPlaylist) {
            //if ($window.localStorage.currentUser) {

            //} else {
                var active = JSON.parse($window.localStorage.playlist_active) >> 0;
                var playlist = JSON.parse($window.localStorage.playlist);

                if (JSON.stringify(currentPlaylist) !== JSON.stringify(playlist[active])) {
                    console.log('change on playlist !');
                    playlist[active] = currentPlaylist;
                    $window.localStorage.playlist = JSON.stringify(playlist);
                    return $q.when('update');
                } else {
                    return $q.when('no change');
                }
            //}
        }

        function deleteFromPlaylist(trackid) {
            //if ($window.localStorage.currentUser) {

            //} else {
                var active = JSON.parse($window.localStorage.playlist_active) >> 0;
                var playlist = JSON.parse($window.localStorage.playlist);
                playlist[active].splice(trackid, 1);
                $window.localStorage.playlist = JSON.stringify(playlist);
            //}
        }

        /**
         * @private
         */
        function addPlaylistActive() {
            if (!$window.localStorage.playlist_active)
                $window.localStorage.playlist_active = JSON.stringify(0);
        }
    }
})();