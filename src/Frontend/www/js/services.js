angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('DataFromAnfrageErstellenCtrlToAnfrageBersichtCtrl', [function () {

         return {
             anfrageData: {},
             titel: {}

         };

 }])

.factory('smartbackend', [function(){
  var smartbackend={};

  smartbackend.urlLocation={};
  smartbackend.urlLocation.serverip="localhost";
  smartbackend.urlLocation.serverport="3000";
  smartbackend.urlLocation.serverprotocol="http";
  smartbackend.urlLocation.baseurl= smartbackend.urlLocation.serverprotocol + "://" + smartbackend.urlLocation.serverip + ":" + smartbackend.urlLocation.serverport;
  smartbackend.urlLocation.api=smartbackend.urlLocation.baseurl + "/api";
  smartbackend.urlLocation.smartbackend=smartbackend.urlLocation.api + "/smartbackend";
  smartbackend.urlLocation.smarthandwerk=smartbackend.urlLocation.api + "/smarthandwerk";

  smartbackend.getApiUrl=function(suffix){
    return smartbackend.urlLocation.api + suffix;
  };

  var userContext=function() {
    this.user = {};
    this.user.profile = {};
    this.user.id = undefined;
    this.user.access_token = undefined;
    this.urlLocation = {};
    this.urlLocation.lastVisitedPage = undefined;

    self = this;
  }

  smartbackend.userContext=new userContext();

  return smartbackend;
}]);
