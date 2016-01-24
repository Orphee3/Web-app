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
            getUserCreations: getUserCreations,
            getPopularCreation: getPopularCreation,
            getCreationComments: getCreationComments,
            getNews: getNews,
            getFlux: getFlux,
            createComment: createComment,
            getAwsSignedUrl: getAwsSignedUrl,
            putPictureToS3: putPictureToS3,
            updateUser: updateUser
        };

        return service;

        function updateUser(user, token, body) {
            var req = {
                method: 'PUT',
                url: '/api/user/' + user._id,
                data: body,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };
            return $http(req)
                .then(updateUserCompleted)
                .catch(console.log);

            function updateUserCompleted(data) {
                return data.data
            }
        }

        function getAwsSignedUrl() {
            return $http.get('/api/upload/image/png')
                .then(getUrlCompleted);

            function getUrlCompleted(data) {
                return data.data;
            }
        }

        function putPictureToS3(url, picture) {
            var deferred = $q.defer();

            var blob = dataURItoBlob(picture);
            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status === 200) deferred.resolve(url);
                    else return deferred.reject();
                }
            };

            req.open('PUT', url.urlPut, true);
            req.setRequestHeader("Content-Type", "image/png");
            req.send(blob);

            return deferred.promise;

            function dataURItoBlob(dataURI) {
                var binary = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var array = [];
                for(var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {type: mimeString});
            }
        }

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

        function getUserCreations(id) {
            return $http.get('/api/user/' + id + '/creation')
                .then(getUserCreationsCompleted)
                .catch(console.log);

            function getUserCreationsCompleted(data) {
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

        function getCreationComments(id) {
            return $http.get('/api/comment/creation/' + id)
                .then(getCommentsCompleted)
                .catch(console.log);
        }

        function getNews(id) {
            return $http.get('/api/user/' + id + '/news')
                .then(getCompleted)
                .catch(console.log);
        }

        function getFlux(id) {
            return $http.get('/api/user/' + id + '/flux')
                .then(getCompleted)
                .catch(console.log);
        }

        function createComment(idCreation, creator, message) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/api/comment',
                data: {
                    creation: idCreation,
                    parentId: idCreation,
                    creator: creator,
                    message: message
                }
            };
            return $http(req)
                .then(function () {
                })
                .catch(console.log);
        }

        function formatCommentsDate(comments) {
            return comments.map(function (comment) {
                comment.dateCreation = moment(comment.dateCreation).calendar();
                return comment;
            });
        }

        function getCommentsCompleted(data, status, headers, config) {
            return formatCommentsDate(data.data);
        }

        function getCompleted(data) {
            return data.data;
        }
    }
})();