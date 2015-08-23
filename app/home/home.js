/**
 * Created by superphung on 8/5/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$auth', '$window', 'socketservice'];

    function HomeCtrl($auth, $window, socketservice) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.show = function () {
            console.log($window.sessionStorage.token);
        };

        function isAuthenticated() {
            //return $window.sessionStorage.token;
            return $auth.isAuthenticated();
        }

        //test lecteur
        vm.play = function () {
            MIDI.Player.loadFile('loop1.loop', MIDI.Player.start);
        };

        vm.pause = function () {
            MIDI.Player.pause(true);
        };

        vm.resume = function () {
            MIDI.Player.resume();
        };

        vm.socket = function() {
            console.log('socket', socketservice.sock);
        }
    }

})();