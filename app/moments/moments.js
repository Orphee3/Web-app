/**
 * Created by superphung on 1/21/16.
 */
(function () {
    angular
        .module('orphee-app')
        .controller('MomentsCtrl', MomentsCtrl);

    MomentsCtrl.$inject = ['$window', 'dataservice'];

    function MomentsCtrl($window, dataservice) {
        var vm = this;

        vm.user = JSON.parse($window.localStorage.currentUser);

        activate();

        function activate() {
            return dataservice.getFlux(vm.user._id)
                .then(function (flux) {
                    console.log('flux', flux);
                    return dataservice.getNews(vm.user._id);
                })
                .then(function (news) {
                    console.log('news', news);
                });
        }
    }

}());