(function(){
  angular.module('jobSearch')
  .controller('NewJobCtrl', newJobCtrl);

  function newJobCtrl($http, $routeParams, jobData){
    var vm = this;
    vm.selectedTab = $routeParams.tab;
    vm.loading=false;
    vm.previewSource = "http://gnngy.com/wp-content/uploads/2015/08/no_image_thumb.gif";
    vm.job = {
"id": "fadb6f36-d4e5-11e5-8cbf-55b201b2688a",
"created_at": "Wed Feb 15 19:46:32 UTC 2017",
"title": "EBC Presenter",
"location": "San Francisco",
"type_": "Full Time",
"description": "<h1>Executive Briefing Center (EBC) Presenter</h1>\n\n<p>GitHub helps companies and organizations succeed by allowing them to build better software, together. We&#39;re looking for a stellar presenter to join our Sales Enablement and EBC team to help build great relationships with executive teams at leading companies around the world.</p>\n\n<p>We care about customer success and customer service, and we&#39;re extremely passionate about the quality of our work. The ideal candidate will have the aptitude and passion to become a master of GitHub’s product capabilities, underlying technology, competitive advantages and fully aware of major trends in Software Development. </p>\n\n<p>Responsibilities:</p>\n\n<ul>\n<li>Present the GitHub vision to executive teams at leading companies around the world</li>\n<li>Develop customized presentations, as needed</li>\n<li>Speak at industry events targeting c-level audiences</li>\n<li>Support Enterprise Sales Representitives in the field on key deals</li>\n<li>Manage and track EBC activity and report on sales outcomes</li>\n</ul>\n\n<p>Qualifications:</p>\n\n<ul>\n<li>5+ years experience presenting to technical and business audiences</li>\n<li>Strong customer orientation, dedication, and passion for delivering a great customer experience</li>\n<li>Strong presentation skills</li>\n<li>Excellent verbal and written communication skills</li>\n<li>Collaborative and team oriented</li>\n<li>Interest in Git and GitHub</li>\n<li>Strong technical aptitude and the ability to become deeply fluent in the GitHub&#39;s technology and the industry</li>\n<li>Travel frequently to Menlo Park, CA</li>\n<li>Domestic and International travel (10-15%)</li>\n</ul>\n\n<p>Preferred Qualifications:</p>\n\n<ul>\n<li>Knowledge of Git and GitHub workflows</li>\n<li>High energy and positive attitude</li>\n<li>Comfortable working in a fast-paced and dynamic environment</li>\n<li>Flexible (ability to work across different time zones) and able to think quickly</li>\n<li>Willing to go the extra mile with a strong work ethic; self-directed and resourceful</li>\n</ul>\n",
"how_to_apply": "<p>Interested? We would love to hear more about you and your interest in being a EBC Presenter at GitHub! Just fill out our application <a href=\"https://jobs.lever.co/github/20368506-8f22-49ec-b189-e0c8054053b1/apply\">here</a>!</p>\n",
"company": "GitHub",
"company_url": "https://github.com/about/jobs",
"company_logo": "http://github-jobs.s3.amazonaws.com/dce62fc0-d4e5-11e5-84bd-c0195559d874.png",
"url": "http://jobs.github.com/positions/fadb6f36-d4e5-11e5-8cbf-55b201b2688a"
};

    vm.loadJob = function(id){
      jobData.getJob(id).then(function(response){
        console.log(response);
        vm.job = response;
      });
    }

    vm.postJob = function(){
      vm.loading=true;
      jobData.postJob(vm.job).then(function(response){
        vm.selectedTab = 'done';
      });
    }

    //vm.loadJob($routeParams.id);

  }
}())
