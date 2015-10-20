/**
 * Created by superphung on 10/19/15.
 */
(function () {
    'use strict';

    angular
        .module('orphee-app')
        .config(function ($translateProvider) {
            $translateProvider.translations('en', {
                //top_nav.html
                'LOG_IN': 'Log in',
                //login.html
                'LOG_IN_HEADER': 'Sign in to continue to Orphee',
                'USERNAME': 'username',
                'PASSWORD': 'password',
                'NEXT': 'Next',
                'OR': 'Or',
                'CREATE_ACCOUNT': 'Create account'
                //side_nav_menu.html

            });

            $translateProvider.translations('fr', {
                //top_nav.html
                'LOG_IN': 'Connexion',
                //login.html
                'LOG_IN_HEADER': 'Connectez-vous sur Orphee',
                'USERNAME': 'nom de compte',
                'PASSWORD': 'mot de passe',
                'NEXT': 'Continuer',
                'OR': 'Ou',
                'CREATE_ACCOUNT': 'Créer un compte'
                //side_nav_menu.html
            });

            $translateProvider.preferredLanguage('en');
        });
})();