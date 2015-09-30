/**
 * Created by superphung on 8/28/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('AudioCtrl', AudioCtrl);

    AudioCtrl.$inject = ['audioservice', '$rootScope', '$scope', '$interval'];

    function AudioCtrl(audioservice, $rootScope, $scope, $interval) {
        var vm = this;

        vm.playImg = 'pause';
        vm.time = 0;
        vm.now = '00:00';
        vm.end = '00:00';

        vm.mousedown = function () {
            MIDI.Player.pause(true);
        };

        vm.mouseup= function() {
            MIDI.Player.currentTime = vm.time / 100 * MIDI.Player.endTime;
            if (MIDI.Player.currentTime < 0) MIDI.Player.currentTime = 0;
            if (MIDI.Player.currentTime >= MIDI.Player.endTime) MIDI.Player.currentTime = MIDI.Player.endTime;
            MIDI.Player.resume();
        };

        $scope.$watch(function () {
            return MIDI.Player.currentTime;
        }, function (n, o) {
            if (n !== o) {
                vm.time = MIDI.Player.currentTime * 100 / MIDI.Player.endTime;
            }
            if (MIDI.Player.currentTime === MIDI.Player.endTime)
                vm.time = 0;
        });

        $interval(function () {
            vm.now = audioservice.getTime('now');
            vm.end = audioservice.getTime('end');
            }, 100, 0, true);

        vm.pausePlayStop = function (stop) {
            var ret = audioservice.pausePlayStop(stop);
            if (ret) {
                vm.playImg = ret;
            }
        };
    }
})();