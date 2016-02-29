(function(){
  angular.module('blog')
  .controller('CategoryCtrl', CategoryCtrl);

  function CategoryCtrl(blogData){
    var vm = this;
    vm.categories = [];

    vm.loadCategories = function(){
      blogData.getCategories().then(function(response){
        console.log(response);
        vm.categories = response;
      });
    }


    vm.loadCategories();

  }
}())
