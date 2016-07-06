//import {Http} from "angular/http";
angular.module('app.controllers', [])

.controller('homeTabCtrl', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:3000/api/smarthandwerk/homepage/alleanfragenanzeigen'
  }).then(function successCallback(response) {
    $scope.anfragen = response.data;

  }, function errorCallback(response) {
    alert("error");
  });



  $scope.anzeigenByID=function(id) {
    //alert("Geklickt");
    $http.get('http://localhost:3000/api/smarthandwerk/angebot/angeboterstellen?id=bfa673de-21f7-11e6-b56d-4b52f205267c').success(function (response) {
      //body der function um erfolgmeldungen abzuarbeiten
      /*  if(!error && response.statusCode==200){
       //erfolgreich
       alert("Erfolgreich angezeigt")
       }
       else{
       //nicht erfolgreich
       alert("Fehler: " + response.statusCode); //hier noch internen Fehlercode
       }
       })
       //hier noch generisch ändern!*/
      console.log(response);
    })
  }
})

.controller('nachrichtenCtrl', function($scope) {

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

.controller('loginCtrl', function($scope, $http) {

  $scope.login=function(){
    //if(provider==="email"){

      /*$http({method: "POST", url:"https://sb.pftclan.de:546/api/smartbackend/auth/email", params:{email:$scope.formData.email,password: $scope.formData.password}})
        .then(function(result) {
          $scope.data.access_token = result.data.access_token;
          $http.defaults.headers.common['Authorization'] = "Bearer "+ $scope.data.access_token;
        },function(error) {
        })*/
    //user in default header schreiben
    $http.defaults.headers.common['User'] = 'bfa673de-21f7-11e6-b56d-4b52f205267c';
    }
 // }

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
