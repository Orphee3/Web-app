/**
 * Created by superphung on 8/13/15.
 */
(function () {
    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
        var service = {
            getById: getById,
            getFriends: getFriends,
            getPopularCreation: getPopularCreation
        };

        return service;

        function getById(id) {
            return $http.get('/api/user/' + id)
                .then(getUserCompleted)
                .catch(console.log);

            function getUserCompleted(data, status, headers, config) {
                return data.data;
            }
        }

        function getFriends(id) {
            return $http.get('/api/user/' + id + '/friends')
                .then(getFriendsCompleted)
                .catch(console.log);

            function getFriendsCompleted(data, status, headers, config) {
                //console.log(data.data);
                //return $q.when(data.data);
                return data.data;
            }
        }

        function getPopularCreation() {
            return $http.get('/api/creationPopular?size=10')
                .then(getCreationCompleted)
                .catch(console.log);

            function getCreationCompleted(data, status, headers, config) {
                return data.data;
            }
        }
    }
})();