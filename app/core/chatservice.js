/**
 * Created by superphung on 8/19/15.
 */

(function () {
    angular
        .module('app.core')
        .factory('chatservice', chatservice);

    chatservice.$inject = ['$http', '$window'];

    function chatservice($http, $window) {
        var vm = this;

        vm.privateChat = false;
        vm.privateTarget = {};

        vm.groupChat = false;
        vm.groupTarget = null;

        var service = {
            setPrivateChat: setPrivateChat,
            getPrivateChat: getPrivateChat,
            setGroupChat: setGroupChat,
            getGroupChat: getGroupChat,

            isCurrentChat: isCurrentChat,
            getTarget: getTarget,
            getRooms: getRooms,
            isPrivateChat: isPrivateChat,
            isGroupChat: isGroupChat,

            formatRoomsDate: formatRoomsDate
        };

        return service;

        function setPrivateChat(target) {
            vm.privateChat = true;
            vm.groupChat = false;
            vm.privateTarget = target; //user model
        }

        function setGroupChat(target) {
            vm.privateChat = false;
            vm.groupChat = true;
            vm.groupTarget = target; //room id
        }

        function getPrivateChat() {
            console.log('getPrivateChat id', vm.privateTarget);
            return $http.get('/api/room/privateMessage/' + vm.privateTarget._id)
                .then(getMessageCompleted)
                .catch(console.log);
        }

        function getGroupChat() {
            return $http.get('/api/room/' + vm.groupTarget + '/groupMessage')
                .then(getMessageCompleted)
                .catch(console.log);
        }

        function getMessageCompleted(data) {
            if (data.status != 204)
                return data.data.reverse();
        }

        function isCurrentChat(source) {
            if (vm.privateChat) return JSON.stringify(source._id) === JSON.stringify(vm.privateTarget._id);
            else return JSON.stringify(source) === JSON.stringify(vm.groupTarget);
        }

        function getTarget() {
            if (vm.privateChat)
                return vm.privateTarget._id;
            else
                return vm.groupTarget;
        }

        function getRooms(id) {
            return $http.get('/api/user/'+ id + '/rooms')
                .then(getRoomCompleted)
                .catch(console.log);

            function getRoomCompleted(data) {
                return sortRooms(formatRoomsDate(managePeoplePrivateRoom(data.data)));
            }
        }

        function isPrivateChat() {
            return vm.privateChat;
        }

        function isGroupChat() {
            return vm.groupChat;
        }

        //private func
        function managePeoplePrivateRoom(rooms) {
            var user;
            return rooms.map(function (room) {
                if (room.private) {
                    user = JSON.parse($window.localStorage.currentUser);
                    if (JSON.stringify(user._id) === JSON.stringify(room.people[0]._id))
                        room.people.splice(0, 1);
                    else room.people.splice(1, 1);
                }
                room.people.push.apply(room.people, room.peopleTmp);
                return room;
            });
        }

        //private func
        function formatRoomsDate(rooms) {
            var now = moment(new Date());
            var last;
            return rooms.map(function (room) {
                last = moment(room.lastMessageDate);
                if (now.diff(last, 'days', true) < 2 && now.format('D') === last.format('D'))
                    room.messageDate = moment(room.lastMessageDate).format('HH:mm');
                else if (now.diff(last, 'days', true) < 2)
                    room.messageDate = 'YESTERDAY';
                else
                    room.messageDate = moment(room.lastMessageDate).format('D/MM/YYYY');
                return room;
            });
        }

        function sortRooms(rooms) {
            return rooms.sort(function (a, b) {
                if (moment(a.lastMessageDate).isBefore(moment(b.lastMessageDate)))
                    return 1;
                else return -1;
            });
        }
    }
})();