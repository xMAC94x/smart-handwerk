angular.module('app.controllers', [])

.controller('homeTabCtrl', function($scope) {

})
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleLightContent();
      }
    });
  })

  // All this does is allow the message
  // to be sent when you tap return
  .directive('input', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        'returnClose': '=',
        'onReturn': '&',
        'onFocus': '&',
        'onBlur': '&'
      },
      link: function(scope, element, attr) {
        element.bind('focus', function(e) {
          if (scope.onFocus) {
            $timeout(function() {
              scope.onFocus();
            });
          }
        });
        element.bind('blur', function(e) {
          if (scope.onBlur) {
            $timeout(function() {
              scope.onBlur();
            });
          }
        });
        element.bind('keydown', function(e) {
          if (e.which == 13) {
            if (scope.returnClose) element[0].blur();
            if (scope.onReturn) {
              $timeout(function() {
                scope.onReturn();
              });
            }
          }
        });
      }
    }
  })

.controller('nachrichtenCtrl', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.showTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];


})

.controller('mapsCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });
})

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('anlegenCtrl', function($scope) {

})

.controller('meineOrteCtrl', function($scope) {

})

.controller('meineBeitrGeCtrl', function($scope) {

})

.controller('historieCtrl', function($scope) {

})

.controller('einstellungenCtrl', function($scope) {

})

.controller('hilfeCtrl', function($scope) {

})

.controller('profilCtrl', function($scope) {

})

.controller('anfrageBersichtCtrl', function($scope) {

})

.controller('anfragenannahmeCtrl', function($scope) {

})

.controller('anfrageErstellenCtrl', function($scope, $http) {
    $http.get('ElementeAnfrage.json').then(function(elementsResponse) {
      $scope.kategorien = elementsResponse.data;
      });
})

.controller('einblendenCtrl', function($scope) {
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
 })

.controller('angebotsBersichtCtrl', function($scope) {

})

.controller('anfrageErstellenBersichtCtrl', function($scope) {

})

.controller('paketeCtrl', function($scope) {

})

.controller('chatEinzelpersonCtrl', function($scope) {

})

.controller('chatGruppenchatCtrl', function($scope) {

})
