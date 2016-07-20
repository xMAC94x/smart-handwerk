angular.module('ionicApp', ['ionic'])

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


  .controller('Messages', function($scope, $timeout, $ionicScrollDelegate) {

    $scope.hideTime = true;

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

  });
