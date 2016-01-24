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
                'LOG_IN': 'Sign in',
                'LOG_OUT': 'Log out',
                'HI': 'Hi',
                'FR': 'French',
                'EN': 'English',
                //login.html
                'LOG_IN_HEADER': 'Sign in to continue to Orphee',
                'USERNAME': 'username',
                'PASSWORD': 'password',
                'NEXT': 'Next',
                'OR': 'Or',
                'CREATE_ACCOUNT': 'Create account',
                //signup.html
                'EMAIL': 'email',
                'NAME': 'name',
                'CONFIRM_PASSWORD': 'Confirm your password',
                'CREATE_YOUR_ORPHEE_ACCOUNT': 'Create your Orphee Account',
                'MUSICAL_CREATION': 'Create music...',
                'MUSICAL_CREATION_TEXT': 'Orphée lets you create music with simplicity no matter your musical background.',
                'TOGETHER': '...together...',
                'TOGETHER_TEXT': 'Create music with your friends in real time! Just find a name for your band!',
                'SHARE': ' ...and share it!',
                'SHARE_TEXT': 'Sharing is important! That\'s why we give you the possibility to let your friends help you in creating music.',
                //side_nav_menu.html
                'HOME': 'Home',
                'PROFILE': 'My account',
                'CREATIONS': 'Creations',
                'CHATS': 'Chats',
                'FRIENDS': 'Friends',
                'MOMENTS': 'Moments',
                'PLAYLIST': 'Playlists',
                //chatlist.html
                'YESTERDAY': 'yesterday',
                //profile.html
                'PROFILE_PICTURE': 'Profile picture',
                'UPLOAD_NEW': 'Upload new avatar',
                'SELECT_FILE': 'Select file',
                'SET_NEW': 'Set new profile picture'
            });

            $translateProvider.translations('fr', {
                //top_nav.html
                'LOG_IN': 'Connexion',
                'LOG_OUT': 'Déconnexion',
                'HI': 'Bonjour',
                'FR': 'Français',
                'En': 'Anglais',
                //login.html
                'LOG_IN_HEADER': 'Connectez-vous sur Orphee',
                'USERNAME': 'nom de compte',
                'PASSWORD': 'mot de passe',
                'NEXT': 'Continuer',
                'OR': 'Ou',
                'CREATE_ACCOUNT': 'Créer un compte',
                //signup.html
                'EMAIL': 'email',
                'NAME': 'nom',
                'CONFIRM_PASSWORD': 'Confirmez votre mot de passe',
                'CREATE_YOUR_ORPHEE_ACCOUNT': 'Créer votre compte Orphee',
                'MUSICAL_CREATION': 'Créez de la musique...',
                'MUSICAL_CREATION_TEXT': 'Avec Orphée, vous pouvez créer votre musique en toute simplicité, quelque soit votre niveau musical',
                'TOGETHER': '...Ensemble...',
                'TOGETHER_TEXT': 'Créez directement vos morceaux avec vos amis, en simultané et tous ensemble. Vous n\'avez plus qu\'à trouver le nom de votre groupe !',
                'SHARE': '...Et Partagez!',
                'SHARE_TEXT': 'Le partage est très important, c\'est pourquoi vous pouvez laisser la liberté à bos amis de vous aidez à composer votre musique. Profitez-en',
                //side_nav_menu.html
                'HOME': 'Accueil',
                'PROFILE': 'Mon compte',
                'CREATIONS': 'Creations',
                'CHATS': 'Chats',
                'FRIENDS': 'Amis',
                'MOMENTS': 'News',
                'PLAYLIST': 'Playlists',
                //chatlist.html
                'YESTERDAY': 'hier',
                //profile.html
                'PROFILE_PICTURE': 'Mon avatar',
                'UPLOAD_NEW': 'Changer mon avatar',
                'SELECT_FILE': 'Choisissez un fichier',
                'SET_NEW': 'Valider mon avatar'
            });

            $translateProvider.preferredLanguage('en');
        });
})();