angular.module('app.controllers', [])
  
.controller('homeTabCtrl', function($scope) {

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
 