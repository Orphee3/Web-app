/**
 * Created by superphung on 8/19/15.
 */

(function () {
    angular
        .module('app.core')
        .factory('chatservice', chatservice);

    chatservice.$inject = ['$http'];

    function chatservice($http) {
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
            isGroupChat: isGroupChat
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
            return source._id  === vm.privateTarget._id;
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
                return data.data;
            }
        }

        function isPrivateChat() {
            return vm.privateChat;
        }

        function isGroupChat() {
            return vm.groupChat;
        }
    }
})();