angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.homeTab'
      2) Using $state.go programatically:
        $state.go('tabsController.homeTab');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page2
      /page1/tab2/page2
  */
  .state('tabsController.homeTab', {
    cache: false,
    url: '/Home',
    views: {
      'tab1': {
        templateUrl: 'templates/homeTab.html',
        controller: 'homeTabCtrl'
      }
    }
  })

.state('agbs', {
    url: '/AGBs',
    templateUrl: 'templates/agbs.html',
    controller: 'agbsCtrl'
  })
.state('datenschutz', {
    url: '/Datenschutz',
    templateUrl: 'templates/datenschutz.html',
    controller: 'datenschutzCtrl'
  })

  .state('impressum', {
    url: '/Impressum',
    templateUrl: 'templates/impressum.html',
    controller: 'impressumCtrl'
  })

  .state('tabsController.nachrichten', {
    url: '/Nachrichten',
    views: {
      'tab4': {
        templateUrl: 'templates/nachrichten.html',
        controller: 'nachrichtenCtrl'
      }
    }
  })

  .state('tabsController.maps', {
    url: '/Karte',
    views: {
      'tab3': {
        templateUrl: 'templates/maps.html',
        controller: 'mapsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/Startseite',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/Einloggen',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/Registrierung',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('anlegen', {
    url: '/AnfrageAnlegen',
    templateUrl: 'templates/anlegen.html',
    controller: 'anlegenCtrl'
  })

  .state('meineOrte', {
    url: '/Orte',
    templateUrl: 'templates/meineOrte.html',
    controller: 'meineOrteCtrl'
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.meineBeitrGe'
      2) Using $state.go programatically:
        $state.go('tabsController.meineBeitrGe');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page9
      /page1/tab2/page9
  */
  .state('meineBeitrGe', {
    cache:false,
    url: '/MeineBeitraege',
    templateUrl: 'templates/meineBeitrGe.html',
    controller: 'meineBeitrGeCtrl'
  })

  .state('MeinePakete', {
    cache:false,
    url: '/MeinePakete',
    templateUrl: 'templates/meinePakete.html',
    controller: 'meinePaketeCtrl'
  })

  .state('historie', {
    url: '/Historie',
    templateUrl: 'templates/historie.html',
    controller: 'historieCtrl'
  })

  .state('einstellungen', {
    url: '/Einstellungen',
    templateUrl: 'templates/einstellungen.html',
    controller: 'einstellungenCtrl'
  })

  .state('hilfe', {
    url: '/Hilfe',
    templateUrl: 'templates/hilfe.html',
    controller: 'hilfeCtrl'
  })

  .state('profil', {
    url: '/Profil',
    templateUrl: 'templates/profil.html',
    controller: 'profilCtrl'
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.anfrageBersicht'
      2) Using $state.go programatically:
        $state.go('tabsController.anfrageBersicht');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page14
      /page1/tab2/page14
  */
  .state('anfrageBersicht', {
    cache:false,
    url: '/AnfrageUebersicht',
    templateUrl: 'templates/anfrageBersicht.html',
    controller: 'anfrageBersichtCtrl'
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.anfragenannahme'
      2) Using $state.go programatically:
        $state.go('tabsController.anfragenannahme');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page15
      /page1/tab2/page15
  */
  .state('anfragenannahme', {
    url: '/AnfrageAnnahme',
    templateUrl: 'templates/anfragenannahme.html',
    controller: 'anfragenannahmeCtrl'
  })

  .state('tabsController.anfrageErstellen', {
    cache: false,
    url: '/AnfrageErstellen',
    views: {
      'tab2': {
        templateUrl: 'templates/anfrageErstellen.html',
        controller: 'anfrageErstellenCtrl'
      }
    }
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.angebotsBersicht'
      2) Using $state.go programatically:
        $state.go('tabsController.angebotsBersicht');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page19
      /page1/tab2/page19
  */
  .state('angebotsBersicht', {
    cache:false,
    url: '/AngebotsUebersicht',
    templateUrl: 'templates/angebotsBersicht.html',
    controller: 'angebotsBersichtCtrl'
  })

  .state('anfrageErstellenBersicht', {
    url: '/AnfrageErstellenUebersicht',
    templateUrl: 'templates/anfrageErstellenBersicht.html',
    controller: 'anfrageErstellenBersichtCtrl'
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.pakete'
      2) Using $state.go programatically:
        $state.go('tabsController.pakete');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page18
      /page1/tab2/page18
  */
  .state('pakete', {
    url: '/Pakete',
    templateUrl: 'templates/pakete.html',
    controller: 'paketeCtrl'
  })

  /*
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.chatEinzelperson'
      2) Using $state.go programatically:
        $state.go('tabsController.chatEinzelperson');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page20
      /page1/tab2/page20
      /page1/tab4/page20
  */
  .state('tabsController.chatEinzelperson', {
    url: '/Einzelchat',
    views: {
      'tab4': {
        templateUrl: 'templates/chatEinzelperson.html',
        controller: 'chatEinzelpersonCtrl'
      }
    }
  })

  .state('tabsController.chatGruppenchat', {
    url: '/Gruppenchat',
    views: {
      'tab4': {
        templateUrl: 'templates/chatGruppenchat.html',
        controller: 'chatGruppenchatCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/Einloggen')



});
