/**
 * Created by superphung on 11/9/15.
 */

(function () {
    angular
        .module('orphee-app')
        .controller('ProfileCtrl', ProfileCtrl)
        .controller('DialogCtrl', DialogCtrl);

    ProfileCtrl.$inject = ['$rootScope', '$mdDialog', '$window', '$auth', 'dataservice', 'audioservice', 'playlistservice'];

    function ProfileCtrl($rootScope, $mdDialog, $window, $auth, dataservice, audioservice, playlistservice) {
        var vm = this;

        vm.user = JSON.parse($window.localStorage.currentUser);
        vm.myImage='';
        vm.myCroppedImage='';

        vm.showDialog = showDialog;

        activate();

        function activate() {
            return dataservice.getUserCreations(vm.user._id)
                .then(function (creations) {
                    vm.creations = creations;
                    console.log('creations', creations);
                });
        }

        vm.playCurrent = function(url) {
            audioservice.play(url);
        };

        vm.addToPlaylist = function(creation) {
            playlistservice.addToPlaylist(creation);
            $rootScope.$broadcast('refresh playlist');
        };

        function showDialog(e) {
            $mdDialog.show({
                controller: DialogCtrl,
                templateUrl: 'dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent:e,
                clickOutsideToClose:true
            }).then(function (fileName) {
                return dataservice.getAwsSignedUrl()
                    .then(function (url) {
                        return dataservice.putPictureToS3(url, fileName);
                    });
            }).then(function (url) {
                var token = $auth.getToken();
                return dataservice.updateUser(vm.user, token, {picture: url.urlGet});
            }).then(function (user) {
                vm.user = user;
                $window.localStorage.currentUser = JSON.stringify(user);
            }).catch(function () {
                console.log('fail');
            });
        }
    }

    DialogCtrl.$inject = ['$scope', '$mdDialog'];

    function DialogCtrl($scope, $mdDialog) {
        $scope.myImage = '';
        $scope.myCroppedImage = '';

        $scope.setAvatar = function () {
            console.log('myCroppedImage', $scope.myCroppedImage);
            $mdDialog.hide($scope.myCroppedImage);
        };

        var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage=evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        setTimeout(function(){
            angular.element( document.querySelector('#fileInput') ).on( 'change', handleFileSelect );
        });
    }
})();