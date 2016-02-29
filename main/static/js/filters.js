angular.module('filters', [])
.filter('cpf', function(){
  return function(text){
    var cpfFinal="";
    if(text){
      for(var i=0; i<text.length;i++){
        cpfFinal+=text[i];
        if(i == 2) cpfFinal+=".";
        if(i == 5) cpfFinal+=".";
        if(i == 8) cpfFinal+="-";
      }
    }

    //var finalStr = text.substring(0,3)+"."+text.substring(3,6)+"."+text.substring(6,9)+"-"+text.substring(9,11);
    return cpfFinal;
  }
})
.filter('itemlist',function(){
  return function(list, specs){
    return list.filter(function(item){
        var itStays=true;

        if(specs) specs.forEach(function(spec){
            spec.values.forEach(function(value){
                if(value.active && itStays) {
                    itStays=false;
                    item.product.specification.item.forEach(function(itt){
                      if(itt.item.label == spec.description){
                        itStays = $.inArray(value.value, itt.item.value) != -1;
                      }
                    });

                }
            });
        });
      return itStays;
    });
  }
}).filter('makeRange', function() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound+1; i++)
                result.push(i);
            return result;
        };
    }).filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});
