

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
         
.controller('loginCtrl', ['$scope', '$http','$auth', function($scope, $http,$auth) {
    $scope.data = {};
    // $scope.email="";//neu50@yahoo.de";
   // $scope.password="";//12345678";
    var sha512 = function(password, salt){ // bower install crypto-js --save
        var hash = window.CryptoJS.HmacSHA512(password, salt).toString(); /** Hashing algorithm sha512 */
        return hash;
    };

    $scope.signup=function(provider){
         $scope.passwordPost= sha512($scope.password,  $scope.email);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT                  
            $http({method: "POST", url:"https://sb.pftclan.de:546/api/smartbackend/auth/signup", params:{email:$scope.email,password: $scope.passwordPost,salt:$scope.salt}})
            .then(function(result) {
                $scope.data.access_token = result.data.access_token;
                $http.defaults.headers.common['Authorization'] = "Bearer "+ $scope.data.access_token;
            },function(error) {
                // toSomething
            })
    }
    $scope.login=function(provider){
        if(provider==="email"){
              //SENT EMAIL TO SERVER GET A SALT
                $scope.passwordPost= sha512($scope.password,  $scope.email);  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
                $http({method: "POST", url:"https://sb.pftclan.de:546/api/smartbackend/auth/email", params:{email:$scope.email,password: $scope.passwordPost}})
                    .then(function(result) {
                                $scope.data.access_token = result.data.access_token;
                                $http.defaults.headers.common['Authorization'] = "Bearer "+ $scope.data.access_token;
                    window.location = '#/page1/page2';
                    
                    },function(error) {
                            // toSomething
                    alert("Error");
                    })
            
        }
    }
    $scope.authenticate=function(provider){
            if(provider==="facebook"){     
                
                  $auth.authenticate(provider).then(function(response) {
            console.log($auth.getToken());
            console.log($auth.getPayload());
                $http({method: "GET", url:"https://sb.pftclan.de:546/api/smartbackend/auth/"+provider+"/", params:{id_token: $auth.getToken()}})
                .then(function(result) {
                        console.log('yes im ok');
                    
                    },function(error) {
                        console.log('Error: ' + error);
                    }
                
            )
            .catch(function(response) {
                userService.SocialLoginFailed();
            });
        
            })
            }
}}])
   
.controller('signupCtrl', function($scope, $document) {

$scope.formOutput= function(){  

    $scope.formValidation();
    
    if(!$scope.formValidation()){
       alert("Richtig");
    }else{
   alert("Falsch");
    }
}
    
    
$scope.formValidation= function(){  
var v = $document[0].getElementById("vname"); 
//var n = $document[0].getElementById("nname"); 
//var u = $document[0].getElementById("uname");   
//var e = $document[0].getElementById("email");   
//var p = $document[0].getElementById("pword"); 
    
var vname = v.form[0].value; 
var nname = v.form[1].value; 
var uname = v.form[2].value;   
var email = v.form[3].value;   
var pword = v.form[4].value;   


if($scope.username_validation(uname,5,12)){  
    if($scope.pword_validation(pword,7,12)){  
        if($scope.allLetter(vname)){  
            if($scope.allLetterN(nname)){
                if($scope.ValidateEmail(email)){   
                    }
                }
            }
        }
    }
return false;
} 




$scope.username_validation= function(uname,mx,my){  
    
var uname_len = uname.length;  
var letters = /^[A-Za-z]+$/;
    if (uname_len == 0 || uname_len >= my || uname_len < mx || !uname.value.match(letters) ){  
        alert("Username should not be empty / length be between "+mx+" to "+my+"or Username must have alphabet characters only");  
        uname.focus();  
        return false;  
    }  
    return true;  
}

$scope.pword_validation=function(pword,mx,my) {
    
var pword_len = pword.length;  
    if (pword_len == 0 ||pword_len >= my || pword_len < mx)  {  
        alert("Password should not be empty / length be between "+mx+" to "+my);  
        pword.focus();  
        return false;  
    }  
    return true;  
}  


$scope.allLetter=function(vname){
    
var letters = /^[A-Za-z]+$/;  
    if(vname.match(letters)){  
        return true;  
    }  
    else{  
        alert('Vorname must have alphabet characters only');  
        vname.focus();  
        return false;  
    }  
}  

$scope.allLetterN=function(nname){
    
var letters = /^[A-Za-z]+$/;  
    if(nname.match(letters)){  
        return true;  
    }  
    else{  
        alert('Nachname must have alphabet characters only');  
        nname.focus();  
        return false;  
    }  
}  


$scope.ValidateEmail=function(email){
    
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
    if(email.match(mailformat)){  
        return true;  
    }  
    else  {  
        alert("You have entered an invalid email address!");  
        email.focus();  
        return false;  
    }  
} 

   
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
   
.controller('chatEinzelpersonCtrl', function($scope, Chats, $state) {

    
})
    
   
.controller('chatGruppenchatCtrl', function($scope) {

})
 