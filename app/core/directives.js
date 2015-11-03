/**
 * Created by superphung on 8/19/15.
 */
(function () {
    angular
        .module('app.core')
        .directive('resize', function ($window) {
            return function (scope, element) {
                var w = angular.element($window);
                scope.getWindowDimensions = function () {
                    return {
                        'h': $window.innerHeight,
                        'w': $window.innerWidth
                    };
                };
                scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;
                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        })
        .directive('schrollBottom', function () {
            return {
                scope: {
                    schrollBottom: "="
                },
                link: function (scope, element) {
                    scope.$watchCollection('schrollBottom', function (newValue) {
                        if (newValue)
                        {
                            $(element).scrollTop($(element)[0].scrollHeight);
                        }
                    });
                }
            }
        });
})();