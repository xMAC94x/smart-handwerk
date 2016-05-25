angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.homeTab', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/homeTab.html',
        controller: 'homeTabCtrl'
      }
    }
  })

  .state('tabsController.nachrichten', {
    url: '/page3',
    views: {
      'tab4': {
        templateUrl: 'templates/nachrichten.html',
        controller: 'nachrichtenCtrl'
      }
    }
  })

  .state('tabsController.maps', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/maps.html',
        controller: 'mapsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.anlegen', {
    url: '/page7',
    views: {
      'tab2': {
        templateUrl: 'templates/anlegen.html',
        controller: 'anlegenCtrl'
      }
    }
  })

  .state('meineOrte', {
    url: '/page8',
    templateUrl: 'templates/meineOrte.html',
    controller: 'meineOrteCtrl'
  })

  .state('meineBeitrGe', {
    url: '/page9',
    templateUrl: 'templates/meineBeitrGe.html',
    controller: 'meineBeitrGeCtrl'
  })

  .state('historie', {
    url: '/page10',
    templateUrl: 'templates/historie.html',
    controller: 'historieCtrl'
  })

  .state('einstellungen', {
    url: '/page11',
    templateUrl: 'templates/einstellungen.html',
    controller: 'einstellungenCtrl'
  })

  .state('hilfe', {
    url: '/page12',
    templateUrl: 'templates/hilfe.html',
    controller: 'hilfeCtrl'
  })

  .state('profil', {
    url: '/page13',
    templateUrl: 'templates/profil.html',
    controller: 'profilCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});