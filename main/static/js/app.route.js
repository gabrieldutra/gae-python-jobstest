(function(){
  angular.module('jobSearch')
    .config(config);

    function config($routeProvider){
      $routeProvider
      .when('/home/:key/:loc/:pg', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      }).when('/job/:id', {
        templateUrl: 'templates/job.html',
        controller: 'JobCtrl',
        controllerAs: 'vm'
      }).when('/newjob/:tab?', {
        templateUrl: 'templates/form.html',
        controller: 'NewJobCtrl',
        controllerAs: 'vm'
      }).otherwise({
        redirectTo: '/home/n/n/1'
      })
    }

}())
