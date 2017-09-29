
var randy = function(max){
  return Math.ceil( Math.random() * max );
};

var addDiv = function(){

  var size = randy( 200 );
// console.log(  'hsla(' + randy(360) + ', 100%, 100%)' );
  $('<div>').css({
    position: 'absolute',
    top:  randy( window.innerHeight ) + "px",
    left: randy( window.innerWidth )  + "px",
    width: size + "px", //Math.random() * 400 + "px",
    height: size + "px", //Math.random() * 400 + "px",
    borderRadius: 5 + randy( size ), // use 'size' var alone here to get circles!
    backgroundColor: "rgb(" + randy(255) + ", " + randy(255) + ", " + randy(255) + ")"
  })
  .appendTo( $('body') )
  // .animate({width: '0px', height: '0px'}, 2000);  // add a shrinking animation effect, why not

  requestAnimationFrame(addDiv);
}


$(document).ready(function(){

  var interval = 2;

  var density = 1000; // set this value to 1-100 to remove old divs at a different rate,
                     // for different density effects

  //setInterval(addDiv, interval);

  // If you use setInterval, the code will keep running and eating your CPU even when the tab is not focused
  // or visible! Use requestAnimationFrame() instead, it's more clever about your resources.
  // Don't forget to call it again at the end of your function to make it loop.

  //requestAnimationFrame(addDiv);

  // start removing old <div>s after waiting long enough for the screen to fill
  // or not? try waiting for only a short time for a different effect
  setTimeout(function(){

    setInterval(function(){

      // remove the first div on the page
      $('div').eq(0).remove();

    }, interval * density );

  },
  interval*2000);  // how long to wait before we start removing <div>s


});
