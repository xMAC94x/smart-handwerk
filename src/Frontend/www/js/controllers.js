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

.controller('mapsCtrl', function($scope, $state, $cordovaGeolocation, $http, smartbackend) {


  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var latLngTest = new google.maps.LatLng(49.4749516, 8.53439449);

    var mapOptions = {
      center: latLngTest,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


      $scope.adressen=[
          "2000+Simcoe+St+N,+Oshawa,+ON+L1H+7K4", "U5+Building,+2000+Founders+Dr,+Oshawa,+ON+L1G+8C4", "43+Conlin+Rd,+Oshawa,+ON+L1H+7K4"
      ];


     $scope.getData = function(adresse) {
    var promise = $http({
    method: 'GET',
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + adresse + "&key=AIzaSyDtKuoMbWqsicTx6i-aDgI1CHLB_R0wu30",
    headers: {
        "Authorization": undefined
           }
  })
    .success(function(data,status,headers,config) {

       return data;
    })
    .error(function(data,status,headers,config) {
        return {"status": false};
    });

    return promise;
    }

     $http({
  method: 'GET',
  url: smartbackend.getApiUrl('/smarthandwerk/anfrage/anfrageadressen')
}).then(function successCallback(response) {
        $scope.adressenAusDB = response.data;
    //    alert(JSON.stringify($scope.adressenAusDB));

         $scope.adressen = [];
         $scope.beschreibungen = [];

         var stadt ="";
         var plz = "";
         var land="";
         var strasse="";
         var hausnr = "";
         var beschreibung = "";

       for (var i in $scope.adressenAusDB) {
           if($scope.adressenAusDB[i].city!=null) {
                stadt = $scope.adressenAusDB[i].city;
           }
           if($scope.adressenAusDB[i].street!=null) {
                strasse = $scope.adressenAusDB[i].street;
                strasse = strasse.split(' ').join('+');
           }
           if($scope.adressenAusDB[i].postal_code!=null) {
                plz = $scope.adressenAusDB[i].postal_code;
           }
           if($scope.adressenAusDB[i].country!=null) {
                land = $scope.adressenAusDB[i].country;
           }
           if($scope.adressenAusDB[i].house_number!=null) {
                hausnr = $scope.adressenAusDB[i].house_number;
           }
           if($scope.adressenAusDB[i].description!=null) {
                beschreibung = $scope.adressenAusDB[i].description;
           }

           var adresseGesamt = strasse + "+" + hausnr + ",+" + plz + "+" + stadt + ",+" + land;
        //   alert(adresseGesamt);
           $scope.adressen.push(adresseGesamt);
           $scope.beschreibungen.push(beschreibung);
        //   alert($scope.adressen);

        }





for (var i = 0; i < $scope.adressen.length; i++) {

    $scope.getData($scope.adressen[i]).then(function(promise) {
     //   alert(JSON.stringify(promise));
        var jsonadresse = promise;

         var lat = jsonadresse.data.results[0].geometry.location.lat;
        var lng = jsonadresse.data.results[0].geometry.location.lng;
        var text = $scope.beschreibungen[i];

      var latLng1 = new google.maps.LatLng(lat, lng);

      var marker = new google.maps.Marker({
    position: latLng1,
    map: $scope.map,
    animation: google.maps.Animation.DROP,
    title: text
});

    })

}


  }, function errorCallback(response) {
    alert("error");
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

.controller('meineBeitrGeCtrl',function($scope, $http, smartbackend, DataFromBeitrCtrlToAnfrageBersichtCtrl) {
  $http({
    method: 'GET',
    url: smartbackend.getApiUrl('/smarthandwerk/anfrage/favouritenliste')
  }).then(function successCallback(response) {
    var anfragen = response.data;
    $scope.meineAnfr = [];
    $scope.favAnfr = [];
    for (i=0; i< anfragen.length; i++){
      if (anfragen[i].myself == "true"){
        //meine eigenen Requests
        $scope.meineAnfr.push(anfragen[i]);
      }else{
        //Favouritenliste
        $scope.favAnfr.push(anfragen[i]);
      }
    }

      }, function errorCallback(response) {
    alert("error");
  });



  $scope.anzeigenByID=function(id) {
    //alert(id);
    //ausgewählten Request: Id weitergeben
    DataFromBeitrCtrlToAnfrageBersichtCtrl.reqId = id;
  }

  $scope.listCanSwipe = true;
})

.controller('historieCtrl', function($scope) {

})

.controller('einstellungenCtrl', function($scope, $http, $location, $document, smartbackend) {
  $scope.speichern=function(){
    var data = {};
    data.setting_allow_geolocation = $scope.settingsList[0].checked;
    data.setting_allow_notification = $scope.settingsList[1].checked;
    console.log(data);
    $http.post(smartbackend.getApiUrl('/smarthandwerk/user/setSettingsFromUser'), data).success(function (response) {
      console.log(response);
      //$location.path("/page1");
    });
  };

  $scope.settingsList = [
    { text: "GPS Zugriff erlauben", checked: false },
    { text: "Notification erlauben", checked: false }
  ];

  $http.get(smartbackend.getApiUrl('/smarthandwerk/user/getSettingsFromUser')).success(function (response) {
    console.log(response);
    $scope.settingsList[0].checked = response.setting_allow_geolocation;
    $scope.settingsList[1].checked = response.setting_allow_notification;
  });
})

.controller('hilfeCtrl', function($scope) {

})

.controller('profilCtrl', function($scope, $http, $document, smartbackend) {

  $scope.skilllist = [];

  $http.get(smartbackend.getApiUrl('/smarthandwerk/user/getSettingsFromUser')).success(function (response) {
    console.log(response);
    $scope.user = {};
    $scope.user.phoneno = response.phoneno;
    $scope.user.username = response.fullname;
    $scope.user.birthday = response.birthday_nice;
    $scope.user.email = response.email;
    $scope.user.prename = response.prename;
    $scope.user.name = response.name;
    $scope.user.country = response.country;
    $scope.user.state = response.state;
    $scope.user.city = response.city;
    $scope.user.postal_code = response.postal_code;
    $scope.user.street = response.street;
    $scope.user.house_number = response.house_number;
    $scope.user.extra = response.extra;
  });

  var skillArray = [];

  $http.get(smartbackend.getApiUrl('/smarthandwerk/user/getAllSkills')).success(function (response) {
    console.log(response);
    $scope.skilllist= [];
    for (var i = 0; i < response.getAllSkills.length; i++) {
      var dataJson = { description: response.getAllSkills[i].description, id: response.getAllSkills[i].id, s1:"true"};
      skillArray.push( dataJson );
    };


    $http.get(smartbackend.getApiUrl('/smarthandwerk/user/getSkillFromUser')).success(function (response) {
      console.log(response);
      for (var j = 0; j < skillArray.length; j++) {
        skillArray[j].s1 = "true";
        delete skillArray[j].s2;
        delete skillArray[j].s3;
        delete skillArray[j].s4;
      }
      for (var i = 0; i < response.skills.length; i++) {
        var curSkill = response.skills[i];
        for (var j = 0; j < skillArray.length; j++) {
          if (skillArray[j].id == curSkill.skillcatalog_id) {
            delete skillArray[j].s1;
            switch(curSkill.level) {
              case "learned":
                skillArray[j].s2 = "true";
                break;
              case "hobby":
                skillArray[j].s3 = "true";
                break;
              case "professional":
                skillArray[j].s4 = "true";
                break;
              default:
                skillArray[j].s1 = "true";
            }
          }
        };
      };
      for (var j = 0; j < skillArray.length; j++) {
        $scope.skilllist.push(skillArray[j]);
      }
    });

  });

  $scope.speichern=function(){
    var data = {};
    data.phoneno = $scope.user.phoneno;
    data.birthday = $scope.user.birthday;
    data.email = $scope.user.email;
    data.prename = $scope.user.prename;
    data.name = $scope.user.name;

    data.country = $scope.user.country;
    data.state = $scope.user.state;
    data.city = $scope.user.city;
    data.postal_code = $scope.user.postal_code;
    data.street = $scope.user.street;
    data.house_number = $scope.user.house_number;
    data.extra = $scope.user.extra;
    console.log(data);
    $http.post(smartbackend.getApiUrl('/smarthandwerk/user/setProfileFromUser'), data).success(function (response) {
      console.log(response);
    });

    var data3 = [];
    for (var i = 0; i < $scope.skilllist.length; i++) {
      if ($scope.skilllist[i].sel != undefined) {
        var str = null;
        switch($scope.skilllist[i].sel) {
          case "Hobby":
            str = "hobby";
            break;
          case "Gelernt":
            str = "learned";
            break;
          case "Professional":
            str = "professional";
            break;
        };
        data3.push({skillcatalog_id: $scope.skilllist[i].id, level: str});
      } else {
        var str = null;
        if ($scope.skilllist[i].s2 == "true") {
          str = "hobby";
        } else if ($scope.skilllist[i].s3 == "true") {
          str = "learned";
        } else if ($scope.skilllist[i].s4 == "true") {
          str = "professional";
        };
        if (str != null) {
          data3.push({skillcatalog_id: $scope.skilllist[i].id, level: str });
        }
      }
    }
    console.log(data3);
    var sendPackage = {};
    sendPackage.skills = data3;
    $http.post(smartbackend.getApiUrl('/smarthandwerk/user/setSkillFromUser'), sendPackage).success(function (response) {
      console.log(response);
    });
  };
})

.controller('anfrageBersichtCtrl', function($scope, $ionicHistory, $ionicLoading, $cordovaToast, $state, $http, smartbackend, DataFromBeitrCtrlToAnfrageBersichtCtrl, DataFromHomeTabCtrlToAnfrageBersichtCtrl, DataFromAnfrageBersichtCtrlToAngebotErst) {
  //alert(DataFromHomeTabCtrlToAnfrageBersichtCtrl.reqId);
  //abfragen woher ich komme
  var vorherTitel = $ionicHistory.backTitle();
  if (vorherTitel == "Home Tab") {
    var reqId = DataFromHomeTabCtrlToAnfrageBersichtCtrl.reqId;
  }else{
    var reqId = DataFromBeitrCtrlToAnfrageBersichtCtrl.reqId;
  }

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

  $scope.ignoreRequest=function(reqId) {
    //ID ans Backend senden
    $http.post(smartbackend.getApiUrl('/smarthandwerk/anfrage/anfrageignorieren?id=' + reqId)).success(function (response) {
      //Meldung
      $ionicLoading.show({
        template: 'Die Anfrage wird dir nicht mehr angezeigt.',
        duration: 1000
      });
      // seite neu laden
      $state.go($state.current, {}, {reload: true});
      var path = "#/Startseite/Home";
      window.location.href = path;
    })
  }

  $scope.makefavourite=function(reqId) {
    //ID ans Backend senden
    $http.post(smartbackend.getApiUrl('/smarthandwerk/anfrage/anfragemerken?id=' + reqId)).success(function (response) {
      //Meldung
      $ionicLoading.show({
        template: 'Diese Anfrage wurde erfolgreich in deine Favouriten gespeichert!',
        duration: 1000
      });
      // seite neu laden
      $state.go($state.current, {}, {reload: true});
      var path = "#/templates/meineBeitrGe.html";
      window.location.href = path;
    })
  }

  $scope.angebotauswahl=function() {
    DataFromAnfrageBersichtCtrlToAngebotErst.reqDetails = $scope.request;

  }
})

.controller('anfragenannahmeCtrl', function($scope, $http, smartbackend, DataFromAnfrageBersichtCtrlToAngebotErst) {
  $scope.request = DataFromAnfrageBersichtCtrlToAngebotErst.reqDetails;
  $scope.titel = $scope.request.general.titel;
  $scope.requestitems = $scope.request.requestitems;
  $scope.offerSel = {};

  $scope.angebotanDB=function(){
    //auswahl abfragen
    var offer = {};
    var singleOfferItem = {};
    var offerItems = [];
    //general data
    offer.discounttotalprice = $scope.offerSel.discount;
    console.log(offer.discounttotalprice);
    for (i in $scope.requestitems){
      if ($scope.requestitems[i].checked) {
        singleOfferItem.price = $scope.requestitems[i].preis;
        console.log(singleOfferItem.price);
        singleOfferItem.requestitem_id = $scope.requestitems[i].requestitem_id;
        console.log(singleOfferItem.requestitem_id);
        offerItems.push(singleOfferItem);
      }//else: requestitem wurde nicht ausgewählt
    }
    offer.offerItems = offerItems;

    //Auswahl an db
    $http.post(smartbackend.getApiUrl('/smarthandwerk/angebot/angeboterstellen'), offer).success(function (response) {
    console.log(response);
    //$location.path("/page1");
    //Meldung
    $ionicLoading.show({
      template: 'Danke für dein Angebot!',
      duration: 1000
    });
    })
  }//function
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


.controller('anfrageErstellenBersichtCtrl', function($scope, $http, $ionicLoading, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl, smartbackend) {

    $scope.auswahl = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData;
    $scope.titel = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel;


    console.log(JSON.stringify($scope.titel));
    console.log(JSON.stringify($scope.auswahl));

   $scope.anfrageJSONsenden = function() {
     $ionicLoading.show({
       template: 'Deine Anfrage wurde erfolgreich gespeichert!',
       duration: 1000
     });
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
