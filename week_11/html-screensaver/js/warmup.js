
var randy = function (max) {
  return Math.floor( Math.random() * max );
}


var addDiv = function () {

  var size = randy( 200 );

  $('<div/>').css({
    position: 'absolute',
    top:  randy( window.innerHeight ) + "px",
    left: randy( window.innerWidth ) + "px",
    width: size + "px",
    height: size + "px",
    borderRadius: 5 + randy( size/2 ), // retro rounded corners
    backgroundColor: "rgb(" + randy(255) + ", " + randy(255) + ", " + randy(255) + ")"
    //backgroundColor: "hsla(" + randy(360) + ", 100%, 50%, 1)"
  })
  .appendTo('body');

  requestAnimationFrame( addDiv );
};



$(document).ready(function () {

  var density =  100;

  // See here: https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame( addDiv );

  // Clean up after ourselves
  setInterval(function () {
    $('div').eq(0).remove(); // remove the first DIV on the page
  }, density);

});
