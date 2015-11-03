/**
 * Created by superphung on 8/19/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope', '$q', 'chatservice', 'socketservice', '$window', '$rootScope', '$location', 'dataservice'];

    function ChatCtrl($scope, $q, chatservice, socketservice, $window, $rootScope, $location, dataservice) {
        var vm = this;

        vm.source = JSON.parse($window.localStorage.currentUser);
        vm.currentTarget = null;
        vm.text = null;
        vm.rooms = null;
        vm.selectedRoom = 0;
        vm.messages = [];

        vm.inputStyle = inputStyle;
        vm.submit = submit;
        vm.openRoom = openRoom;


        socketservice.getSocket().on('private message', function (data) {
            console.log('private mess', data);
            //if (chatservice.isCurrentChat(data.source))
            vm.messages.push(data.message);
        });

        socketservice.getSocket().on('group message', function (data) {
            console.log('group mess', data);
            vm.messages.push(data.message);
        });

        $rootScope.$on('change friend', function (e, data) {
            console.log('vm.currentTarget', vm.currentTarget);
                console.log('data', data);
            if (vm.currentTarget != data) {
                console.log('change friend on');
                vm.messages = [];
                vm.currentTarget = data;

                activate();
            }
        });

        firstLoad();

        function activate() {

            //var promises = chatservice.isPrivateChat() ? [getPrivateChat()];
            //console.log('isPrivate', chatservice.isPrivateChat());
            var promises = [getChat(), getRooms()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated chat');
                    vm.rooms.forEach(function (room, index) {
                        if (!room.private) return;
                        if (JSON.stringify(room.people[0]._id) === JSON.stringify(vm.currentTarget)) {
                            vm.selectedRoom = index;
                        }
                    });
                });
        }

        function firstLoad() {
            var promises = [getRooms()];

            return $q.all(promises)
                .then(function (data) {
                    //first room filter by date
                    return data[0][0];
                })
                .then(setChat)
                .then(getChat);
        }

        function setChat(room) {
            if (!room) return;
            if (room.private) return getById(room.people[0]._id).then(chatservice.setPrivateChat);
            else return chatservice.setGroupChat(room._id);
        }

        function getById(id) {
            return dataservice.getById(id)
                .then(function (data) {
                    return data;
                });
        }

        function getChat() {
            var func;
            if (chatservice.isPrivateChat()) func = chatservice.getPrivateChat;
            else if (chatservice.isGroupChat()) func = chatservice.getGroupChat;
            else {
                $location.url('/chatlist');
                return;
            }

            //var func = chatservice.isPrivateChat() ? chatservice.getPrivateChat : chatservice.getGroupChat;
            return func()
                .then(function (data) {
                    console.log('get chat', data);
                    if (data) {
                        data.forEach(function (message) {
                            vm.messages.push(message);
                        })
                    }
                    return vm.messages;
                });
        }

        function getRooms() {
            return chatservice.getRooms(vm.source._id)
                .then(function (data) {
                    vm.rooms = data;
                    return vm.rooms;
                });
        }

        function submit() {

            var obj = {
                creator: {name: vm.source.name, picture: vm.source.picture},
                message: vm.text
            };
            vm.messages.push(obj);
            console.log('target', chatservice.getTarget());

            if (vm.selectedRoom !== 0) {
                var splicedRoom = vm.rooms.splice(vm.selectedRoom, 1);
                splicedRoom[0].lastMessageDate = new Date();
                vm.rooms.unshift(chatservice.formatRoomsDate(splicedRoom)[0]);
                vm.selectedRoom = 0;
            }

            if (chatservice.isPrivateChat())
                socketservice.emit('private message', {to: chatservice.getTarget(), message: vm.text});
            else {
                console.log('emit group mess from client');
                socketservice.emit('group message', {to: chatservice.getTarget(), message: vm.text});
            }
            vm.text = '';

        }

        function openRoom(room, index) {
            if (vm.selectedRoom === index) return;

            var promises = [setChat(room)];

            vm.selectedRoom = index;
            vm.messages.length = 0;
            return $q.all(promises)
                .then(getChat);

        }

        function inputStyle() {
            return {
                position: 'relative',
                width: ($scope.windowWidth - 250 - 350) + 'px'
            };
        }
    }
})();