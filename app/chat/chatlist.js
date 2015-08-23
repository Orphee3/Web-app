/**
 * Created by superphung on 8/21/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('ChatListCtrl', ChatListCtrl);

    ChatListCtrl.$inject = ['$q', 'chatservice', '$window', '$location', 'dataservice'];

    function ChatListCtrl($q, chatservice, $window, $location, dataservice) {
        var vm = this;

        vm.user = JSON.parse($window.localStorage.currentUser);
        vm.rooms = null;

        vm.openChat = openChat;
        vm.createRoomChat = createRoomChat;

        activate();

        function activate() {
            var promises = [getRooms()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated chat list');
                });
        }

        function getRooms() {
            chatservice.getRooms(vm.user._id)
                .then(function (data) {
                    vm.rooms = data;
                });
        }

        function openChat(room) {
            //private chat
            console.log('room.name', room.name);
            console.log('room.people.length', room.people.length);
            if (room.name && room.people.length === 2) {
                if (room.people.indexOf(vm.user._id) === 0) {
                    getById(room.people[1])
                        .then(chatservice.setPrivateChat)
                        .then(goToChat);
                } else {
                    getById(room.people[0])
                        .then(chatservice.setPrivateChat)
                        .then(goToChat);
                }
                function goToChat() {
                    $location.url('/chat');
                }
            } else {
                console.log('group chat');
                console.log('room._id', room._id);
                chatservice.setGroupChat(room._id);
                $location.url('/chat');
                /*chatservice.setGroupChat(room._id);
                $location.url('/chat');*/
            }
            //group chat
        }

        function getById(id) {
            return dataservice.getById(id)
                .then(function (data) {
                    return data;
                });
        }

        function createRoomChat() {
            $location.url('/createroom');
        }
    }
})();