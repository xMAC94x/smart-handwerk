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

   
//.controller('anfrageErstellenCtrl', function($scope, $http) {
//    $http.get('ElementeAnfrage.json').then(function(elementsResponse) {
//      $scope.kategorien = elementsResponse.data;
//      });
//})

.controller('anfrageErstellenCtrl', function($scope, $document, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl, $http) {
    
$http({
  method: 'GET',
  url: 'http://localhost:3000/api/smarthandwerk/anfrage/anfrageerstellen'
}).then(function successCallback(response) {
        $scope.kategorien = response.data;

  }, function errorCallback(response) {
    alert("error");
  });
    

 /*   
$scope.kategorien = [
 {"oberkategorie": "Wand / Boden",
  "elemente": {
    "raumgroesse": {"id": "raumgroesse", "art": "number", "beschriftung": "Raumgröße", "style": "display: inline-block;padding-top: 8px;padding-bottom:15px;width:5em;text-align:right", "name": "qm" },
    "parkett": {"id": "parkett", "art": "radio", "name": "Parkett", "gruppe": "boden", "eigenschaften": {
    "parkettlegenlassen": {"id": "parkett-legen-lassen", "art": "checkbox", "name": "Parkett legen lassen" }
               } },
    "teppich": {"id": "teppich", "art": "radio", "name": "Teppichboden", "gruppe": "boden", "eigenschaften": {
       "teppichfarbe": {"id": "teppich-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
        "teppichlegenlassen": {"id": "teppich-legen-lassen", "art": "checkbox", "name": "Teppich legen lassen" }
  } },
    "fliesen": {"id": "fliesen", "art": "radio", "name": "Fliesen", "gruppe": "boden", "eigenschaften": {
      "fliesenfarbe":  {"id": "fliesen-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
       "fliesenlegenlassen":  {"id": "fliesen-legen-lassen", "art": "checkbox", "name": "Fliesen legen lassen" }
  } },
    "pvc": {"id": "pvc", "art": "radio", "name": "PVC", "gruppe": "boden", "eigenschaften": {
      "pvcfarbe":  {"id": "pvc-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
       "pvclegenlassen": {"id": "pvc-legen-lassen", "art": "checkbox", "name": "PVC verlegen lassen" }
  } },
    "laminat": {"id": "laminat", "art": "radio", "name": "Laminat", "gruppe": "boden", "eigenschaften": {
        "laminatlegenlassen": {"id": "laminat-legen-lassen", "art": "checkbox", "name": "Laminat verlegen lassen" }
               } },
    "tapete": {"id": "tapete", "art": "checkbox", "name": "Tapete", "eigenschaften": {
       "tapetefarbe": {"id": "tapete-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
       "tapezierenlassen": {"id": "tapezieren-lassen", "art": "checkbox", "name": "tapezieren lassen" }
 } },
    "farbe": {"id": "farbe", "art": "checkbox", "name": "Farbe", "eigenschaften": {
      "farbefarbe":  {"id": "farbe-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
       "farbestreichenlassen": {"id": "farbe-nicht-selbst-streichen", "art": "checkbox", "name": "streichen lassen" }
 }  }
            }
 },
 {"oberkategorie": "Einrichtung",
  "elemente": {
    "bett": {"id": "bett", "art": "checkbox", "name": "Bett", "eigenschaften": {
      "bettgroesse":  {"id": "bett-groesse1", "beschriftung": "Maße:", "placeholder": "z.B. 80x200"},
       "bettmaterial": {"id": "bett-material", "beschriftung": "Material:", "style": "width:10em"},
       "bettbettgestell": {"id": "bett-bettgestell", "art": "checkbox", "name": "Bettgestell"},
        "bettkopfteil": {"id": "bett-kopfteil", "art": "checkbox", "name": "Kopfteil"},
       "bettlattenrost": {"id": "bett-lattenrost", "art": "checkbox", "name": "Lattenrost"},
       "bettmatratze": {"id": "bett-matratze", "art": "checkbox", "name": "Matratze"},
       "bettsonstiges": {"id": "bett-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        "bettaufbauenlassen": {"id": "bett-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    } },
   "schrank": {"id": "schrank", "art": "checkbox", "name": "Schrank", "eigenschaften": {
       "schrankmasse": {"id": "schrank-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
        "schrankmaterial": {"id": "schrank-material", "beschriftung": "Material:", "style": "width:10em"},
       "schrankschiebetuer": {"id": "schrank-schiebetuer", "art": "radio", "name": "Schiebetür", "gruppe": "tuer"},
       "schranknormaletuer": {"id": "schrank-normale-tuer", "art": "radio", "name": "Normale Tür", "gruppe": "tuer"},
        "schrankspiegel": {"id": "schrank-spiegel", "art": "checkbox", "name": "Mit Spiegel"},
        "schranktuerenanzahl": {"id": "schrank-tueren-anzahl", "beschriftung": "Anzahl Türen:", "style": "width:3em"},
        "schranksetzboedenanzahl": {"id": "schrank-setzboeden-anzahl", "beschriftung": "Anzahl Setzböden:", "style": "width:3em"},
        "schrankschubladenanzahl": {"id": "schrank-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        "schrankstangenanzahl": {"id": "schrank-stangen-anzahl", "beschriftung": "Anzahl Stangen:", "style": "width:3em"},
        "bettsonstiges": {"id": "bett-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        "schrankaufbauenlassen": {"id": "schrank-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    } },
   "nachttisch": {"id": "nachttisch", "art": "checkbox", "name": "Nachttisch", "eigenschaften": {
       "nachttischmasse":  {"id": "nachttisch-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
        "nachttischmaterial": {"id": "nachttisch-material", "beschriftung": "Material:", "style": "width:10em"},
       "nachttischanzahl": {"id": "nachttisch-anzahl", "beschriftung": "Anzahl:", "style": "width:3em"},
        "nachttischschubladenanzahl": {"id": "nachttisch-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        "nachttischsonstiges": {"id": "nachttisch-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
       "nachttischaufbauenlassen": {"id": "nachttisch-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    } },
    "kommode": {"id": "kommode", "art": "checkbox", "name": "Kommode", "eigenschaften": {
       "kommodemasse": {"id": "kommode-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
       "kommodematerial": {"id": "kommode-material", "beschriftung": "Material:", "style": "width:10em"},
        "kommodeschubladenanzahl": {"id": "kommode-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        "kommodeschubladentueren": {"id": "kommode-schubladen-tueren", "beschriftung": "Anzahl Türen:", "style": "width:3em"},
        "kommodesonstiges": {"id": "kommode-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
       "kommodeaufbauenlassen": {"id": "kommode-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    } },
    "buecherregal": {"id": "buecherregal", "art": "checkbox", "name": "Bücherregal" }
            }
 },
 {"oberkategorie": "Beleuchtung",
  "elemente": {
    "deckenbeleuchtung": {"id": "deckenbeleuchtung", "art": "checkbox", "name": "Deckenbeleuchtung" },
    "nachttischlampe": {"id": "nachttischlampe", "art": "checkbox", "name": "Nachttischlampe" },
    "stehlampe": {"id": "stehlampe", "art": "checkbox", "name": "Stehlampe" }
    }
 },
 {"oberkategorie": "Zusätzliche Einrichtung",
  "elemente": {
   "gardine": {"id": "gardine", "art": "checkbox", "name": "Gardine" },
    "spiegel": {"id": "spiegel", "art": "checkbox", "name": "Spiegel" }
    }
 },
{"oberkategorie": "Dienstleistung",
  "elemente": {
   "bodenleger": {"id": "bodenleger", "art": "checkbox", "name": "Bodenleger" },
   "tapezierer": {"id": "tapezierer", "art": "checkbox", "name": "Tapezierer" },
    "maler": {"id": "maler", "art": "checkbox", "name": "Maler" },
    "elektriker": {"id": "elektrik", "art": "checkbox", "name": "Elektrik" },
   "schreiner": {"id": "schreiner", "art": "checkbox", "name": "Schreiner" },
   "montage": {"id": "montage", "art": "checkbox", "name": "Montage" },
    "schneider": {"id": "schneider", "art": "checkbox", "name": "Schneider" },
    "planungsberater": {"id": "planungsberater", "art": "checkbox", "name": "Planungsberater" }
    }
 },
{"oberkategorie": "Ort",
  "elemente": {
   "lokal": {"id": "lokal", "art": "radio", "name": "lokale Suche", "gruppe": "ort" },
    "ortegal": {"id": "ort-egal", "art": "radio", "name": "egal", "gruppe": "ort" }
    }
 },
{"oberkategorie": "Skill-Level",
  "elemente": {
    "hobby": {"id": "hobby", "art": "radio", "name": "Hobby", "gruppe": "skill" },
    "professional": {"id": "professional", "art": "radio", "name": "Professional", "gruppe": "skill" },
    "skillegal": {"id": "skill-egal", "art": "radio", "name": "egal", "gruppe": "skill" }

    }
 },
     {"oberkategorie": "Preisvorstellung",
  "elemente": {
    "mindestens": {"beschriftung": "Mindestens", "id": "preis-min", "name": "€", "style": "width:5em" },
    "maximal": {"beschriftung": "Maximal", "id": "preis-max", "name": "€", "style": "width:5em" }
    }
 },
  {"oberkategorie": "Fertigstellungstermin",
  "elemente": {
      "spaetesterTermin": {"beschriftung": "Spätester Termin:", "art": "date", "id": "fertigstellungstermin"}
  }
 },
  {"oberkategorie": "Weitere Kommentare",
  "elemente": {
    "weitereKommentare": {"id": "weitereKommentare" },
  }
 }
    ]
*/


    $scope.jsonErstellen = function() {
     //   $scope.url = "";

        for (var j in $scope.kategorien) {
        for (var i in $scope.kategorien[j].elemente) { 
            
            var ele = $document[0].getElementById($scope.kategorien[j].elemente[i].id);
            var art = $scope.kategorien[j].elemente[i].art;
            if(art==="radio" || art==="checkbox") {
                if(!ele.checked) {
                    delete  $scope.kategorien[j].elemente[i];
                } else {
                                 
        //     var urltext = ele.id.toString() + "=" + ele.checked.toString();
        //     $scope.url = $scope.url + urltext + "&"; 
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
                if(inputtext ==="") {                delete  $scope.kategorien[j].elemente[i].eigenschaften[k];
                }
            //    var urltext = eig.id.toString() + "=" + inputtext;
                else {
                $scope.kategorien[j].elemente[i].eigenschaften[k].value = eig.value;
                     }
            }
           //  $scope.url = $scope.url + urltext + "&";   
            
                }
                k=0
            }
            }
            }
            else {
         //       ele.id.toString() + "=" + ele.id.value;
         //       $scope.url = $scope.url + urltext + "&";
                 var inputtext = ele.value;
                if(inputtext ==="") {                delete  $scope.kategorien[j].elemente[i];
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
        return $scope.kategorien;
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

    $scope.zurueckZumBearbeiten = function() {
        
    }

    
})


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
   
.controller('anfrageErstellenBersichtCtrl', function($scope, $http, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl) {
    

    $scope.auswahl = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData;
    $scope.titel = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel;

    console.log(JSON.stringify($scope.titel));
    console.log(JSON.stringify($scope.auswahl));

   $scope.anfrageJSONsenden = function() {
       alert("Übertrage Daten....");
       var req = {
            method: 'POST',
            url: 'http://localhost:3000/api/smarthandwerk/anfrage/anfragespeichern',
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
    
})

   
.controller('angebotsBersichtCtrl', function($scope) {

})

.controller('paketeCtrl', function($scope) {

})

.controller('chatEinzelpersonCtrl', function($scope) {

})

.controller('chatGruppenchatCtrl', function($scope) {

})
