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
   
//.controller('anfrageErstellenCtrl', function($scope, $http) {
//    $http.get('ElementeAnfrage.json').then(function(elementsResponse) {
//      $scope.kategorien = elementsResponse.data;
//      });
//})

.controller('anfrageErstellenCtrl', function($scope, $document, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl) {

$scope.kategorien = [
 {"oberkategorie": "Wand / Boden",
  "elemente": [
    {"id": "raumgroesse", "art": "number", "beschriftung": "Raumgröße", "style": "display:inline;width:5em;text-align:right", "name": "qm", "auswahl": "false" },
    {"id": "parkett", "art": "radio", "name": "Parkett", "gruppe": "boden", "eigenschaften": [
    {"id": "parkett-legen-lassen", "art": "checkbox", "name": "Parkett legen lassen" }
    ] },
    {"id": "teppich", "art": "radio", "name": "Teppichboden", "gruppe": "boden", "eigenschaften": [
        {"id": "teppich-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
        {"id": "teppich-legen-lassen", "art": "checkbox", "name": "Teppich legen lassen" }
    ] },
    {"id": "fliesen", "art": "radio", "name": "Fliesen", "gruppe": "boden", "eigenschaften": [
        {"id": "fliesen-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
         {"id": "fliesen-legen-lassen", "art": "checkbox", "name": "Fliesen legen lassen" }
    ] },
    {"id": "pvc", "art": "radio", "name": "PVC", "gruppe": "boden", "eigenschaften": [
        {"id": "pvc-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
        {"id": "pvc-legen-lassen", "art": "checkbox", "name": "PVC verlegen lassen" }
    ] },
    {"id": "laminat", "art": "radio", "name": "Laminat", "gruppe": "boden", "eigenschaften": [
         {"id": "laminat-legen-lassen", "art": "checkbox", "name": "Laminat verlegen lassen" }
    ] },
    {"id": "tapete", "art": "checkbox", "name": "Tapete", "eigenschaften": [
        {"id": "tapete-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
        {"id": "tapezieren-lassen", "art": "checkbox", "name": "tapezieren lassen" }
    ] },
    {"id": "farbe", "art": "checkbox", "name": "Farbe", "eigenschaften": [
        {"id": "farbe-farbe", "beschriftung": "Farbton:", "style": "width:10em"},
        {"id": "farbe-nicht-selbst-streichen", "art": "checkbox", "name": "streichen lassen" }
    ]  }
  ]
 },
 {"oberkategorie": "Einrichtung",
  "elemente": [
    {"id": "bett", "art": "checkbox", "name": "Bett", "eigenschaften": [
        {"id": "bett-groesse1", "beschriftung": "Maße:", "placeholder": "z.B. 80x200"},
        {"id": "bett-material", "beschriftung": "Material:", "style": "width:10em"},
        {"id": "bett-bettgestell", "art": "checkbox", "name": "Bettgestell"},
        {"id": "bett-kopfteil", "art": "checkbox", "name": "Kopfteil"},
        {"id": "bett-lattenrost", "art": "checkbox", "name": "Lattenrost"},
        {"id": "bett-matratze", "art": "checkbox", "name": "Matratze"},
        {"id": "bett-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        {"id": "bett-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    ] },
    {"id": "schrank", "art": "checkbox", "name": "Schrank", "eigenschaften": [
        {"id": "schrank-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
        {"id": "schrank-material", "beschriftung": "Material:", "style": "width:10em"},
        {"id": "schrank-schiebetuer", "art": "radio", "name": "Schiebetür", "gruppe": "tuer"},
        {"id": "schrank-normale-tuer", "art": "radio", "name": "Normale Tür", "gruppe": "tuer"},
        {"id": "schrank-spiegel", "art": "checkbox", "name": "Mit Spiegel"},
        {"id": "schrank-tueren-anzahl", "beschriftung": "Anzahl Türen:", "style": "width:3em"},
        {"id": "schrank-setzboeden-anzahl", "beschriftung": "Anzahl Setzböden:", "style": "width:3em"},
        {"id": "schrank-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        {"id": "schrank-stangen-anzahl", "beschriftung": "Anzahl Stangen:", "style": "width:3em"},
        {"id": "bett-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        {"id": "schrank-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    ] },
    {"id": "nachttisch", "art": "checkbox", "name": "Nachttisch", "eigenschaften": [
        {"id": "nachttisch-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
        {"id": "nachttisch-material", "beschriftung": "Material:", "style": "width:10em"},
        {"id": "nachttisch-anzahl", "beschriftung": "Anzahl:", "style": "width:3em"},
        {"id": "nachttisch-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        {"id": "nachttisch-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        {"id": "nachttisch-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    ] },
    {"id": "kommode", "art": "checkbox", "name": "Kommode", "eigenschaften": [
        {"id": "kommode-masse", "beschriftung": "Maße:", "placeholder": "Breite x Höhe x Tiefe"},
        {"id": "kommode-material", "beschriftung": "Material:", "style": "width:10em"},
        {"id": "kommode-schubladen-anzahl", "beschriftung": "Anzahl Schubladen:", "style": "width:3em"},
        {"id": "kommode-schubladen-tueren", "beschriftung": "Anzahl Türen:", "style": "width:3em"},
        {"id": "kommode-sonstiges", "art": "textarea", "beschriftung": "Sonstiges:"},
        {"id": "kommode-nicht-selbst-aufbauen", "art": "checkbox", "name": "aufbauen lassen" }
    ] },
    {"id": "buecherregal", "art": "checkbox", "name": "Bücherregal" }
  ]
 },
 {"oberkategorie": "Beleuchtung",
  "elemente": [
    {"id": "deckenbeleuchtung", "art": "checkbox", "name": "Deckenbeleuchtung" },
    {"id": "nachttischlampe", "art": "checkbox", "name": "Nachttischlampe" },
    {"id": "stehlampe", "art": "checkbox", "name": "Stehlampe" }
  ]
 },
 {"oberkategorie": "Zusätzliche Einrichtung",
  "elemente": [
    {"id": "gardine", "art": "checkbox", "name": "Gardine" },
    {"id": "spiegel", "art": "checkbox", "name": "Spiegel" }
  ]
 },
{"oberkategorie": "Dienstleistung",
  "elemente": [
    {"id": "bodenleger", "art": "checkbox", "name": "Bodenleger" },
    {"id": "tapezierer", "art": "checkbox", "name": "Tapezierer" },
    {"id": "maler", "art": "checkbox", "name": "Maler" },
    {"id": "elektrik", "art": "checkbox", "name": "Elektrik" },
    {"id": "schreiner", "art": "checkbox", "name": "Schreiner" },
    {"id": "montage", "art": "checkbox", "name": "Montage" },
    {"id": "schneider", "art": "checkbox", "name": "Schneider" },
    {"id": "planungsberater", "art": "checkbox", "name": "Planungsberater" }
  ]
 },
{"oberkategorie": "Ort",
  "elemente": [
    {"id": "lokal", "art": "radio", "name": "lokale Suche", "gruppe": "ort" },
    {"id": "ort-egal", "art": "radio", "name": "egal", "gruppe": "ort" }
   ]
 },
{"oberkategorie": "Skill-Level",
  "elemente": [
    {"id": "hobby", "art": "radio", "name": "Hobby", "gruppe": "skill" },
    {"id": "professional", "art": "radio", "name": "Professional", "gruppe": "skill" },
    {"id": "skill-egal", "art": "radio", "name": "egal", "gruppe": "skill" }

   ]
 },
     {"oberkategorie": "Preisvorstellung",
  "elemente": [
    {"beschriftung": "Mindestens", "id": "preis-min", "name": "€", "style": "width:5em" },
    {"beschriftung": "Maximal", "id": "preis-max", "name": "€", "style": "width:5em" }
  ]
 },
  {"oberkategorie": "Fertigstellungstermin",
  "elemente": [
          {"beschriftung": "Spätester Termin:", "art": "date", "id": "fertigstellungstermin"}
   ]
 },
  {"oberkategorie": "Weitere Kommentare",
  "elemente": [
    {"id": "weitereKommentare" },
   ]
 }
]



    $scope.jsonErstellen = function() {
     //   $scope.url = "";

        for (var j in $scope.kategorien) {
        for (var i in $scope.kategorien[j].elemente) { 
            
            var ele = $document[0].getElementById($scope.kategorien[j].elemente[i].id);
            var art = $scope.kategorien[j].elemente[i].art;
            if(art==="radio" || art==="checkbox") {
                
                $scope.kategorien[j].elemente[i].value = ele.checked.toString();
                
        //     var urltext = ele.id.toString() + "=" + ele.checked.toString();
        //     $scope.url = $scope.url + urltext + "&"; 
                if(ele.checked && $scope.kategorien[j].elemente[i].eigenschaften != null) {
                for (var k in $scope.kategorien[j].elemente[i].eigenschaften) {
                    var eig = $document[0].getElementById($scope.kategorien[j].elemente[i].eigenschaften[k].id);
            var eigart = $scope.kategorien[j].elemente[i].eigenschaften[k].art;
                
                if(eigart==="radio" || eigart==="checkbox") {
         //       var urltext = eig.id.toString() + "=" + eig.checked.toString();
                     $scope.kategorien[j].elemente[i].eigenschaften[k].value = eig.checked.toString();

            }
            else {
                var inputtext = eig.value;
                if(inputtext ==="") {                $scope.kategorien[j].elemente[i].eigenschaften[k].value = "NA";
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
            else {
         //       ele.id.toString() + "=" + ele.id.value;
         //       $scope.url = $scope.url + urltext + "&";
                 var inputtext = ele.value;
                if(inputtext ==="") {                $scope.kategorien[j].elemente[i].value = "NA"; 
                }
                else {
                    $scope.kategorien[j].elemente[i].value = ele.value;
                }
            }
            
            };
        i=0;
        }
        
        var anfrageTitel = $document[0].getElementById('anfrageTitel');
        
        DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel = anfrageTitel.value;
        
        DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData = $scope.kategorien;
        return $scope.kategorien;
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
   
.controller('anfrageErstellenBersichtCtrl', function($scope, DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl) {
    var auswahl = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.anfrageData;
    var titel = DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl.titel;

    console.log(JSON.stringify(titel));
    console.log(JSON.stringify(auswahl));
    
    
})
   
.controller('angebotsBersichtCtrl', function($scope) {

})
   
.controller('paketeCtrl', function($scope) {

})
   
.controller('chatEinzelpersonCtrl', function($scope) {

})
   
.controller('chatGruppenchatCtrl', function($scope) {

})
 