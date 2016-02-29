(function(){
  angular.module('jobSearch')
  .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($location, $routeParams, jobData, timeAgo){
    timeAgo.settings.allowFuture = true;
    var vm = this;
    vm.loading=false;
    vm.jobs = [];
    vm.key = $routeParams.key;
    vm.loc = $routeParams.loc;
    vm.pg = $routeParams.pg;
    vm.meta={}
    vm.jobsearch = {
      description: $routeParams.key,
      location: $routeParams.loc
    }

    vm.reloadJobs = function(){
      if(!vm.loading) {
        var key="n";
        var loc="n";
        if(vm.jobsearch.description) key=vm.jobsearch.description;
        if(vm.jobsearch.location) loc=vm.jobsearch.location;
        $location.path("home/"+key+"/"+loc+"/"+1);
      }
    }

    vm.loadJobs = function(){
      if(!vm.loading){
        //$location.path("#/home/"+vm.jobsearch.description+"/"+vm.jobsearch.location+"/"+vm.pg);
        vm.loading=true;
          console.log(vm.jobsearch);
          jobData.getJobs(vm.jobsearch.description,vm.jobsearch.location,vm.pg-1).then(function(response){
            vm.jobs = response.list;
            vm.meta=response.meta;
            vm.loading=false;
          });
      }

    }

    if(vm.jobsearch.description == 'n') vm.jobsearch.description = "";
    if(vm.jobsearch.location == 'n') vm.jobsearch.location = "";
    if(vm.pg == undefined) vm.pg=1;
    vm.loadJobs();

  }
}())
