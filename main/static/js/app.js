(function(){
  angular.module('jobSearch', ['ngSanitize','ngRoute','directives','services','filters','timeAgo','angular-loading-bar', 'ngAnimate']).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);

}())
