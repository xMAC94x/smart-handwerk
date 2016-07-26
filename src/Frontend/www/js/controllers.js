//import {Http} from "angular/http";

angular.module('app.controllers', [])

.controller('homeTabCtrl', function($scope, $http, smartbackend, DataFromHomeTabCtrlToAnfrageBersichtCtrl) {
  $http({
    method: 'GET',
    url: smartbackend.getApiUrl('/smarthandwerk/homepage/alleanfragenanzeigen')
  }).then(function successCallback(response) {
    $scope.anfragen = response.data;

  }, function errorCallback(response) {
    alert("error");
  });



  $scope.anzeigenByID=function(id) {
    //alert(id);
    //ausgewählten Request: Id weitergeben
    DataFromHomeTabCtrlToAnfrageBersichtCtrl.reqId = id;
  }

  $scope.listCanSwipe = true;
})

.controller('nachrichtenCtrl', function($scope) {

})

.controller('mapsCtrl', function($scope, $state, $cordovaGeolocation, $http) {
    
    
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    
      
      
      
      
  $scope.jsonadresse =  {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "Simcoe Building",
               "short_name" : "Simcoe Building",
               "types" : [ "premise" ]
            },
            {
               "long_name" : "2000",
               "short_name" : "2000",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Simcoe Street North",
               "short_name" : "Simcoe St N",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Oshawa",
               "short_name" : "Oshawa",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Durham Regional Municipality",
               "short_name" : "Durham Regional Municipality",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "Ontario",
               "short_name" : "ON",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "Kanada",
               "short_name" : "CA",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "L1H 7K4",
               "short_name" : "L1H 7K4",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "Simcoe Building, 2000 Simcoe St N, Oshawa, ON L1H 7K4, Kanada",
         "geometry" : {
            "bounds" : {
               "northeast" : {
                  "lat" : 43.94627029999999,
                  "lng" : -78.894031
               },
               "southwest" : {
                  "lat" : 43.94474650000001,
                  "lng" : -78.895234
               }
            },
            "location" : {
               "lat" : 43.9455084,
               "lng" : -78.8946325
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 43.9468573802915,
                  "lng" : -78.89328351970849
               },
               "southwest" : {
                  "lat" : 43.94415941970851,
                  "lng" : -78.89598148029151
               }
            }
         },
         "place_id" : "ChIJ57DneZob1YkRrInw-O3sTPs",
         "types" : [ "premise" ]
      }
   ],
   "status" : "OK"
}
    
  
  var lat = $scope.jsonadresse.results[0].geometry.location.lat;
  var lng = $scope.jsonadresse.results[0].geometry.location.lng;

      
  
      
  //    $sccope.getPositions = function(adresse){
  /*         $http({
    method: 'GET',
    url: //adresse
    "https://maps.googleapis.com/maps/api/geocode/json?address=2000+Simcoe+St+N,+Oshawa,+ON+L1H+7K4&key=AIzaSyDtKuoMbWqsicTx6i-aDgI1CHLB_R0wu30",
    headers: {
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key'
           }
  }).then(function successCallback(response) {
        $scope.adresse = response.data;
        alert($scope.adresse);

  }, function errorCallback(response) {
    alert("error");
  });*/
  //}


//for (var i = 0; i < $scope.comments.length; i++) {
//  getIsLiked(i);
//}
      
      
    var latLng1 = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
    position: latLng1,
    map: $scope.map,
    animation: google.maps.Animation.DROP,
    title: "Mark On Map"
});
      
      
      

  }, function(error){
    console.log("Could not get location");
  });
    
    
 /*   $http({
    method: 'GET',
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=2000+Simcoe+St+N,+Oshawa,+ON+L1H+7K4&key=AIzaSyDtKuoMbWqsicTx6i-aDgI1CHLB_R0wu30"
  }).then(function successCallback(response) {
        $scope.adresse = response.data;
        alert($scope.adresse);

  }, function errorCallback(response) {
    alert("error");
  });*/
    
    
    
    


    
    
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
               // $http(method: "PUT", url: + "profile", data:{
                    //  vname:
                      })
            },function(error) {
                // toSomething
            }

    $scope.login=function(provider){
        if(provider==="email"){
              //SENT EMAIL TO SERVER GET A SALT
                $scope.passwordPost= sha512($scope.password || "",  $scope.email || "");  // THERE IS NO GUARANTEE THAT THE SALT IS CORRECT MAY ITS A RANDOM SALT FOR SAFTEY IF EMAIL ISNT CORRECT
                $http({method: "POST", url:"https://sb.pftclan.de:546/api/smartbackend/auth/email", params:{email:$scope.email,password: $scope.passwordPost}})
                    .then(function(result) {
                                $scope.data.access_token = result.data.access_token;
                                //$http.defaults.headers.common['Authorization'] = "Bearer "+ $scope.data.access_token;
                        $http.defaults.headers.common['Authorization']="Bearer a54738c81db59ac2a06a13dd3634f1e90fd79b778d20efb900470887766e5c64a28845d738226854359a94b1950f76c8";

                 //   $state.go('tabsController.homeTab');
                   window.location = '#/Startseite/Home';

                    },function(error) {
                            // toSomething

                        $http.defaults.headers.common['Authorization']="Bearer a54738c81db59ac2a06a13dd3634f1e90fd79b778d20efb900470887766e5c64a28845d738226854359a94b1950f76c8";

                 //   $state.go('tabsController.homeTab');
                   window.location = '#/Startseite/Home';
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

.controller('signupCtrl', ['$scope', '$http','$auth', function($scope, $http,$auth, $document) {
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
               // $http(method: "PUT", url: + "profile", data:{
                    //  vname:
                      })
            },function(error) {
                // toSomething
            }


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


}])

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

.controller('anfrageBersichtCtrl', function($scope, $http, smartbackend, DataFromHomeTabCtrlToAnfrageBersichtCtrl) {
  //alert(DataFromHomeTabCtrlToAnfrageBersichtCtrl.reqId);
  var reqId = DataFromHomeTabCtrlToAnfrageBersichtCtrl.reqId;

  $http.get(smartbackend.getApiUrl('/smarthandwerk/anfrage/anfrageanzeigen?id=' + reqId)).success(function (response) {
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
    $scope.request = response;
    $scope.titel = response.general.titel;
    $scope.requestitems = response.requestitems;
    console.log(JSON.stringify($scope.titel));
  })
})

.controller('anfragenannahmeCtrl', function($scope) {

})


//.controller('anfrageErstellenCtrl', function($scope, $http) {
//    $http.get('ElementeAnfrage.json').then(function(elementsResponse) {
//      $scope.kategorien = elementsResponse.data;
//      });
//})


.controller('anfrageErstellenCtrl', function($scope, $document, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl, ChecklisteOriginalCtrl, smartbackend, $http, $state) {

$http({
  method: 'GET',
  url: smartbackend.getApiUrl('/smarthandwerk/anfrage/anfrageerstellen')
}).then(function successCallback(response) {
        $scope.kategorien = response.data;
        $scope.checkliste = response.data;
        ChecklisteOriginalCtrl.gesamteListe = $scope.kategorien;


  }, function errorCallback(response) {
    alert("error");
  });



    $scope.jsonErstellen = function() {
     //   $scope.url = "";


        if($scope.validateRequest()) {



        for (var j in $scope.kategorien) {
        for (var i in $scope.kategorien[j].elemente) {

            var ele = $document[0].getElementById($scope.kategorien[j].elemente[i].id);
            var art = $scope.kategorien[j].elemente[i].art;
            if(art==="radio" || art==="checkbox") {
                if(!ele.checked) {
                    delete  $scope.kategorien[j].elemente[i];
                } else {

                if(ele.checked && $scope.kategorien[j].elemente[i].eigenschaften != null) {
                for (var k in $scope.kategorien[j].elemente[i].eigenschaften) {
                    var eig = $document[0].getElementById($scope.kategorien[j].elemente[i].eigenschaften[k].id);
            var eigart = $scope.kategorien[j].elemente[i].eigenschaften[k].art;

                if(eigart==="radio" || eigart==="checkbox") {
         //       var urltext = eig.id.toString() + "=" + eig.checked.toString();

                 if(!eig.checked) {
                    delete  $scope.kategorien[j].elemente[i].eigenschaften[k];
                } else {

            }
                }
            else {
                var inputtext = eig.value;
                if(inputtext ==="") {
                    delete $scope.kategorien[j].elemente[i].eigenschaften[k];
                }
                else {
                $scope.kategorien[j].elemente[i].eigenschaften[k].value = eig.value;
                     }
            }

                }
                k=0
            }
            }
            }
            else {
                 var inputtext = ele.value;
                if(inputtext ==="") {
                    delete  $scope.kategorien[j].elemente[i];
                }
                else {
                    $scope.kategorien[j].elemente[i].value = ele.value;
                }
            }

            };
        i=0;
        }



        var laenge = $scope.kategorien.length;
        for (var i=laenge;i--;) {
            var elements = $scope.kategorien[i].elemente;
            if((Object.keys(elements).length === 0) && (elements.constructor === Object)) {
                //delete  $scope.kategorien[j];
                delete  $scope.kategorien.splice(i,1);
            }
        }


        var anfrageTitel = $document[0].getElementById('anfrageTitel');

        DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel = anfrageTitel.value;

        DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData = $scope.kategorien;

         window.location='#/AnfrageErstellenUebersicht';

        return $scope.kategorien;


        }else {
            alert("Datum ist ein Pflichtfeld");
            //Fehlermeldung ausgeben, wenn form nicht korrekt ausgefüllt


        }
    }



  /*    $scope.anzeigenByID = function(id) {
    //alert("Geklickt");
    $http.get('http://localhost:3000/api/smarthandwerk/angebot/angeboterstellen?id=5').success(function (response) {
      //body der function um erfolgmeldungen abzuarbeiten
      console.log(response);//Response in console schrieben
      /*if(response.status <= 200){
       //erfolgreich
       alert("Erfolgreich angezeigt")
       }
       else{
       //nicht erfolgreich
       alert("Fehler: " + response.statusText); //hier noch internen Fehlercode
       }*/




    $scope.abbrechen = function() {


            $state.go($state.current, {}, {reload: true});


            var path = "#/Startseite/Home";
            window.location.href = path;


    }

    $scope.validateRequest = function() {

        var valid = false;

        for (var j in $scope.kategorien) {
        for (var i in $scope.kategorien[j].elemente) {

            var ele = $document[0].getElementById($scope.kategorien[j].elemente[i].id);
            var art = $scope.kategorien[j].elemente[i].art;
            if(art==="date") {
                if(ele.value == null || ele.value == "") {

                    return false;

                } else {

                    valid = true;

            }
        }
         k=0
        }
        i=0;
        }
        return valid;

    }

})
/*
.controller('listeCtrl', function($scope, ChecklisteOriginalCtrl, $document) {

        $scope.abbrechen = function() {

            $scope.kategorien = ChecklisteOriginalCtrl.gesamteListe;


       //     $scope.kategorien = $scope.checkliste;
           // alert($scope.kategorien);
      //      $scope.kategorien = ChecklisteOriginalCtrl.gesamteListe;
      //      window.location = '#/Startseite/Home';
           // $scope.addform.$setPristine();


   /*     for (var j in $scope.kategorien) {
        for (var i in $scope.kategorien[j].elemente) {

            var ele = $document[0].getElementById($scope.kategorien[j].elemente[i].id);
            var art = $scope.kategorien[j].elemente[i].art;
            if(art==="radio" || art==="checkbox") {
                ele.checked=false;

                if($scope.kategorien[j].elemente[i].eigenschaften != null) {
                for (var k in $scope.kategorien[j].elemente[i].eigenschaften) {
                    var eig = $document[0].getElementById($scope.kategorien[j].elemente[i].eigenschaften[k].id);
            var eigart = $scope.kategorien[j].elemente[i].eigenschaften[k].art;

            if(eigart==="radio" || eigart==="checkbox") {
                    eig.checked=false;
                }
            else {
                $scope.kategorien[j].elemente[i].eigenschaften[k].value = "";

            }

            }
            }

            }
            else {
                $scope.kategorien[j].elemente[i].value = "";

            }

            };
        }
            $scope.checkliste.$setPristine();

            var path = "#/Startseite/AnfrageErstellen";
            window.location.href = path;



    }



 })*/


.controller('einblendenCtrl', function($scope) {
    $scope.myVar = false;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };

 })

.controller('auswahlEinblendenCtrl', function($scope) {
    $scope.myVar2 = false;
    $scope.auswahleinblenden = function() {
        $scope.myVar2 = !$scope.myVar2;
    };

 })


.controller('anfrageErstellenBersichtCtrl', function($scope, $http, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl, smartbackend) {

    $scope.auswahl = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData;
    $scope.titel = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel;


    console.log(JSON.stringify($scope.titel));
    console.log(JSON.stringify($scope.auswahl));

   $scope.anfrageJSONsenden = function() {
       alert("Übertrage Daten....");
       var req = {
            method: 'POST',
            url: smartbackend.getApiUrl('/smarthandwerk/anfrage/anfragespeichern'),
           headers: {
               'Content-Type': 'application/json',
           },
           data: { titel: $scope.titel,
                 auswahl: $scope.auswahl}
       }

       $http(req).then(function(elementsResponse) {
           alert("response");
          console.log(elementsResponse.data);
      });

   }


       $scope.zurueckZumBearbeiten = function() {




    }


})

.controller('agbsCtrl', function($scope) {

})

.controller('datenschutzCtrl', function($scope) {

})

.controller('impressumCtrl', function($scope) {

})


.controller('angebotsBersichtCtrl', function($scope){

})

.controller('paketeCtrl', function($scope) {

})


.controller('chatEinzelpersonCtrl', function($scope) {



})

.controller('chatGruppenchatCtrl', function($scope) {

});
