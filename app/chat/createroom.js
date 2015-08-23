/**
 * Created by superphung on 8/21/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('CreateRoomCtrl', CreateRoomCtrl);

    CreateRoomCtrl.$inject = ['$q', '$window', 'dataservice', 'chatservice', '$location', 'socketservice'];

    function CreateRoomCtrl($q, $window, dataservice, chatservice, $location, socketservice) {
        var vm = this;

        vm.user = JSON.parse($window.localStorage.currentUser);
        vm.friends = [];
        vm.friendsSelected = [];

        vm.set = set;
        vm.exist = exist;
        vm.createChat = createChat;
        vm.test = function () {
            console.log(vm.friendsSelected);
        };

        activate();

        function activate() {
            var promises = [getFriends()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated create room');
                });
        }

        function getFriends() {
            return dataservice.getFriends(vm.user._id)
                .then(function (data) {
                    vm.friends = data;
                });
        }

        function set(friend) {
            var index = vm.friendsSelected.indexOf(friend);
            if (index > -1)
                vm.friendsSelected.splice(index, 1);
            else
                vm.friendsSelected.push(friend);
        }


        function exist(friend) {
            return vm.friendsSelected.indexOf(friend) > -1;
        }

        //chat creation
        socketservice.getSocket().on('create chat group', function (data) {

        });

        function createChat() {
            if (vm.friendsSelected.length === 0)
                return;
            if (vm.friendsSelected.length === 1) {
                chatservice.setPrivateChat(vm.friendsSelected[0]);
                $location.url('/chat');
            } else {
                console.log('create emit');
                var people = vm.friendsSelected.map(function (friend) {
                    return friend._id;
                });
                socketservice.emit('create chat group', {people: people});
            }
        }
    }
})();