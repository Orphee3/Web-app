/**
 * Created by superphung on 8/9/15.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('SideNavFriendsCtrl', SideNavFriendsCtrl);

    SideNavFriendsCtrl.$inject = ['navservice', 'dataservice', '$window', '$q', '$location', 'chatservice', '$rootScope', '$scope'];

    function SideNavFriendsCtrl(navservice, dataservice, $window, $q, $location, chatservice, $scope, $rootScope) {
        var vm = this;

        vm.friends = [];

        vm.isOpen = isOpen;
        vm.openPrivateChat = openPrivateChat;

        //check if the nav is open

        $scope.$on('refresh nav', function () {
            console.log('receive on');
            if (navservice.getSideNavState('friends'))
                activate();
        });

        function isOpen() {
            return navservice.getSideNavState('friends');
        }

        function openPrivateChat(friend) {
            console.log('openPrivateChat', friend);
            chatservice.setPrivateChat(friend);
            $rootScope.$emit('change friend', friend._id);
            $location.url('/chat');
        }


        function activate() {
            var promises = [getFriends()];

            return $q.all(promises)
                .then(function () {
                    console.log('activated friend nav');
                });
        }

        function getFriends() {
            if ($window.localStorage.currentUser)
                vm.user = JSON.parse($window.localStorage.currentUser);
            return dataservice.getFriends(vm.user._id)
                .then(function (data) {
                    vm.friends = data;
                    return vm.friends;
                });

        }
    }
})();