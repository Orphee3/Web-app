/**
 * Created by superphung on 8/19/15.
 */
(function () {
    angular
        .module('orphee-app')
        .factory('socketservice', socketservice);

    socketservice.$inject = ['socketFactory', '$window'];

    function socketservice(socketFactory, $window) {
        var vm = this;

        vm.mySocket = null;

        connect();

        return {
            connect: connect,
            disconnect: disconnect,
            getSocket: getSocket,
            emit: emit
        };

        function connect() {
            if ($window.localStorage.satellizer_token && $window.localStorage.currentUser) {
                var token = $window.localStorage.satellizer_token;
                var id = JSON.parse($window.localStorage.currentUser)._id;
                console.log('token', token);
                var ioSocket = io.connect('http://localhost:3000?token=' + token);
                vm.mySocket = socketFactory({
                    ioSocket: ioSocket
                });
                console.log('connect to channel', id);
                vm.mySocket.emit('subscribe', {channel: id});
            }
        }

        function disconnect() {
            vm.mySocket.disconnect();
            //vm.mySocket = null;
        }

        function getSocket() {
            return vm.mySocket;
        }

        function emit(e, obj) {
            vm.mySocket.emit(e, obj);
        }
    }
})();