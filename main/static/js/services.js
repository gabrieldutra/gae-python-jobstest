angular.module('services',[]).factory("jobData",jobData);

function jobData($http){

  var baseUrl = "/api/v1/positions";

  var services = {
    getJobs: getJobs,
    getJob: getJob,
    postJob: postJob
  }

  return services;

  function getJobs(description, location, page){

    return $http.get(baseUrl+"?keyword="+description+"&location="+location+"&page="+page, {cache: true}).then(function(response){
      response.data.list.forEach(function(it){
        it.id = it.key
        it.type = it.type_
        it.date = new Date(it.created);
      });
      response.data.list.sort(function(a,b){
        if(a.date > b.date) return -1;
        if(a.date == b.date) return 0;
        return 1;
      });
      return response.data;
    });
  }

  function getJob(id){
    return $http.get(baseUrl+"/"+id, {cache: true}).then(function(response){
      response.data.date = new Date(response.data.created);
      if(response.data.company_logo == null) response.data.company_logo = "http://gnngy.com/wp-content/uploads/2015/08/no_image_thumb.gif";
      return response.data;
    });
  }

  function postJob(job){
    return $http.post(baseUrl, job).then(function(response){
      return response.data;
    })
  }

}
