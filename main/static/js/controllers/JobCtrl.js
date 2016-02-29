(function(){
  angular.module('jobSearch')
  .controller('JobCtrl', jobCtrl);

  function jobCtrl($http, $routeParams, jobData){
    var vm = this;
    vm.job = {}

    vm.loadJob = function(id){
      jobData.getJob(id).then(function(response){
        console.log(response);
        vm.job = response;
      });
    }

    vm.loadJob($routeParams.id);

  }
}())
