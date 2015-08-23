/**
 * Created by superphung on 8/19/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope', '$q', 'chatservice', 'socketservice', '$window', '$rootScope', '$location'];

    function ChatCtrl($scope, $q, chatservice, socketservice, $window, $rootScope, $location) {
        var vm = this;

        vm.source = JSON.parse($window.localStorage.currentUser);
        vm.currentTarget = null;
        vm.text = null;
        vm.messages = [];

        vm.inputStyle = inputStyle;
        vm.submit = submit;


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

        activate();

        function activate() {

            //var promises = chatservice.isPrivateChat() ? [getPrivateChat()];
            //console.log('isPrivate', chatservice.isPrivateChat());
            var promises = [getChat()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated chat');
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
            func()
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

        function submit() {
            var obj = {
                creator: {name: vm.source.name, picture: vm.source.picture},
                message: vm.text
            };
            vm.messages.push(obj);
            console.log('target', chatservice.getTarget());
            if (chatservice.isPrivateChat())
                socketservice.emit('private message', {to: chatservice.getTarget(), message: vm.text});
            else {
                console.log('emit group mess from client');
                socketservice.emit('group message', {to: chatservice.getTarget(), message: vm.text});
            }
            vm.text = '';
        }

        function inputStyle() {
            return {
                position: 'relative',
                width: ($scope.windowWidth - 250 - 350) + 'px',
                'margin-right': '500px'
            };
        }
    }
})();