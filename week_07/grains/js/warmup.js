
var grains = {

  range: _.range(1, 65),

  square: function( num ){
    return Math.pow(2, num-1);
  },

  eachSquare: function() {

    var results = [];

    _.each(grains.range, function (i) {
      var grain = grains.square(i);
      results.push("Square " + i + ": " + grain + ' <span style="font-size: 8pt">[ 2^(square-1) = 2^' + (i-1) + " = " + grain + " ]</span><br>"); 
    });

    return results;
  },

  total: function(){
    return _.reduce(grains.range, function(sum, num){
      return sum + grains.square(num);
    }, 0);
  },
};

$(document).ready(function () {

  $("#one").click(function () {

    var val = $("#number").val();
    var result = grains.square(val);
    $("#result").text(result);

  });

  $("#eachSquare").click(function () {
    var result = grains.eachSquare();
    $("#result").html(result);
  });

  $("#total").click(function () {
    var result = grains.total();
    $("#result").text(result);
  });


});



//
// console.log( grains.eachSquare() );
//
// console.log( grains.total() );
