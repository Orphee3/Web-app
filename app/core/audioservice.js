/**
 * Created by superphung on 8/28/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('audioservice', audioservice);

    audioservice.$inject = ['$window', '$rootScope'];

    function audioservice($window, $rootScope) {
        var vm = this;

        vm.now = '00:00';
        vm.end = '00:00';
        vm.time = 0;
        vm.songid = 0;

        MIDI.loadPlugin({
            soundfontUrl: "./soundfont/"
        });

        var service = {
            play: play,
            pausePlayStop: pausePlayStop,
            addPlayList: addPlayList,
            getTime: getTime,

            getSongIndex: getSongIndex,
            setSongIndex: setSongIndex,

            setPlay: setPlay
        };

        return service;

        function play(url) {
            MIDI.Player.loadFile(url, MIDI.Player.start);
            MIDI.Player.setAnimation(function (data) {
                var now = data.now >> 0;
                var end = data.end >> 0;
                vm.now = formatTime(now);
                vm.end = formatTime(end);
            });
        }

        function pausePlayStop(stop) {
            if (stop) {
            } else if (MIDI.Player.playing && (MIDI.Player.currentTime !== MIDI.Player.endTime)) {
                MIDI.Player.pause(true);
                return 'play_arrow';
            } else {
                MIDI.Player.resume();
                return 'pause';
            }
        }

        function getSongIndex() {
            return vm.songid;
        }

        function setSongIndex(offset) {
            vm.songid += offset;
            if (vm.songid < 0)
                vm.songid = 0;
        }

        function setPlay() {
            console.log('setPlay!');
            vm.songid = 0;
        }

        function addPlayList(song, selectedTrack) {
            /*MIDI.Player.loadFile(song[0], MIDI.Player.start);
            MIDI.Player.setAnimation(function (data) {
                var now = data.now >> 0;
                var end = data.end >> 0;
                //vm.time = now * 100 / end;
                vm.now = formatTime(now);
                vm.end = formatTime(end);
                if (now === end) {
                    var id = ++vm.songid % song.length;
                    MIDI.Player.loadFile(song[id], MIDI.Player.start);
                }
            });*/
            //var idx = song.indexOf(selectedTrack);
            //if (idx !== -1) idx = 0;
            vm.songid = selectedTrack;
            $rootScope.$broadcast('song start !', {name: song[vm.songid].name, trackActive: vm.songid});
            MIDI.Player.loadFile(song[vm.songid].url, MIDI.Player.start);
            MIDI.Player.setAnimation(function (data) {
                var now = data.now >> 0;
                var end = data.end >> 0;
                vm.now = formatTime(now);
                vm.end = formatTime(end);
                if (now === end) {
                    var active = JSON.parse($window.localStorage.playlist_active);
                    var playlist = JSON.parse($window.localStorage.playlist);
                    //var id = playlist[active].indexOf(selectedTrack);
                    //if (id !== -1) id = (id + 1) % playlist[active].length;
                    //else id = 0;
                    //var id = ++vm.songid % song.length;
                    vm.songid = (vm.songid + 1) % song.length;
                    console.log(vm.songid);
                    $rootScope.$broadcast('song start !', {name: song[vm.songid].name, trackActive: vm.songid});
                    MIDI.Player.loadFile(playlist[active][vm.songid].url, MIDI.Player.start);
                }
            });
        }

        function getTime(time) {
            return vm[time];
        }

        function formatTime(n) {
            var minutes = n / 60 >> 0;
            var seconds = String(n - (minutes * 60) >> 0);
            if (seconds.length == 1) seconds = '0' + seconds;
            return minutes + ':' + seconds;
        }
    }
})();