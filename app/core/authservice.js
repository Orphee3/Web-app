/**
 * Created by superphung on 8/5/15.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    authservice.$inject = ['$http'];

    function authservice($http) {
        var service = {
            loginLocal: loginLocal
        };

        return service;

        function loginLocal(user) {
            var encodedCredentials = btoa(user.username + ':' + user.password);
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/api/login',
                headers: {
                    Authorization: 'Bearer ' + encodedCredentials
                }
            };

            return $http(req)
                .then(getToken)
                .catch();

            function getToken(data, status, headers, config) {
                return {
                    token: data.data.token,
                    user: data.data.user
                };
            }
        }

    }
})();