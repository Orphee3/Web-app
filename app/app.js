(function () {
    'use strict';

    angular
        .module('orphee-app', [
            'ngRoute',
            //'ui.router',
            'ngMaterial',
            'ui.bootstrap',
            'satellizer',
            'app.core',
            angularDragula(angular)
        ])
        .config(function ($mdThemingProvider, $authProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('light-blue');

            $authProvider.facebook({
                clientId: '560109060810772'
            });

            $authProvider.google({
                clientId: '919545271872-psm7m96hdbh9jekp9b6cqnl8q7b8i906.apps.googleusercontent.com'
            });
        });
})();
