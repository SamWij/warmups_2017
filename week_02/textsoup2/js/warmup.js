// Don't run any of our code until the whole HTML document is ready
// (so our jQuery selectors will work and we can change the DOM)
$(document).ready(function () {

  var timer = null;
  var counter = 0;

  // This object will store all the variables we want the GUI controls to change;
  // we need to use an object structure because that is what the dat.gui library expects
  var controls = {
    fadeInSpeed: 500,   // These number variables will cause a GUI slider element to be shown
    fadeOutSpeed: 2000,
    fontSizeRange: 100,
    timerInterval: 100,
    textColour: [ 255, 255, 255 ],   // This will be treated as an RGB color
    addWord: '',  // This is a string, so the GUI will show a text field

    // a  method like this will cause a GUI button to be shown, which calls this function when clicked
    clearWords: function () {
      $(".word").remove(); // Just remove all elements with class="word"
    }
  };

  // create our GUI object
  var gui = new dat.GUI();

  // Add the various controller elements
  // Note that we pass our controls object as a variable, but the internal properties (variables) as a string.
  // We also need to specify a min and max range for the slider
  gui.add(controls, 'fadeInSpeed', 1, 5000);
  gui.add(controls, 'fadeOutSpeed', 1, 5000);
  gui.add(controls, 'fontSizeRange', 1, 200);

  // In order to use the 'onFinishChange' event handler for a GUI element, we need to
  // keep track of the return value of gui.add, a reference to the element, to attach
  // our event handler to.
  var timerController = gui.add(controls, 'timerInterval', 1, 1000);

  // And here is our handler
  timerController.onFinishChange(function(value) {
    // We'd better clear the old timer first, or we'll have multiple setInterval timers running
    clearInterval( timer );
    timer = setInterval( putWord, value );
  });

  // Note the different method name for the colour picker element
  gui.addColor(controls, 'textColour');

  // Note that the gui.add() method to show a text field or a button is the same as for
  // a number, except that there's no range values specified
  gui.add(controls, 'addWord');
  gui.add(controls, 'clearWords');

  // This single line grabs the text contents of our div and returns it as one big string (the .html()
  // jQuery method would grab any child HTML it contained too), then turns it into an array by splitting
  // the string up based on a regular expression which looks for spaces, punctuation and newlines.
  // So, note that .split() will accept a regular expression as well as just a string...
  // But for our purposes here, .split(' ') would probably have been okay, and faster.
  var words = $('#words').text().split(/[ ;\-,.\n]+/);

  // Store the body element in a variable, instead of using the jQuery selector each time we
  // want to append a new word div (which would be slightly slower & waste CPU)
  var $body = $('body');

  // A small helper function to return a random int between 0 and max
  // Think about how you would implement a more general solution to return an
  // integer between any two values, min and max
  var randy = function( max ) {
    return Math.floor( Math.random() * max );
  };

  // Our main function to randomly put a word on the page
  var putWord = function() {

    // Get a random word from our array, using our random helper funcion, with the word array
    // length as the maximum value
    var randomIndex = randy( words.length );
    var text = '';

    // 1. We want to check whether a word has been typed at all, so check the length; and also:
    // 2. To make sure we insert the word in between our random words, we'll use an incrementing
    // counter value, and check whether the number is even by using the modulus operator.
    // (Better remember to increment that counter at the end of this function!)
    if ( (controls.addWord.length > 0) && (counter % 2 == 0) ){
      text = controls.addWord;
    } else {
      text = words[randomIndex];
    }

    // Insert the random word as the content of a new div
    var $div = $('<div class="word">').html( text );

    // Set some CSS properties dynamically
    // (i.e. set the div's position to be random)
    // Note that you can pass an object literal to the .css() jQuery function,
    // so you can specify many CSS properties at once
    $div.css({
      top: randy( window.innerHeight ) + 'px',
      left: randy( window.innerWidth ) + 'px',

      // Use the new value from our controls object, changed by the GUI slider
      fontSize: (12 + randy( controls.fontSizeRange )) + 'px',  // note that in a CSS file you would use the property 'font-size'

      // Use the new value from our controls object
      color: controls.textColour

      // extra tricks:
      // transform: 'rotate(' + randy(360) + 'deg)',
      //color: 'rgb(' + randy(255) + ', ' + randy(255) + ', ' + randy(255) + ')'
    });

    // Actually add our new (and until now, detached) element to the DOM and thus the page
    $div.appendTo( $body );

    // Hooray for jQuery! This will fade our div in over 1 second (assuming it's "display: none" to
    // begin with), then once that is done, immediately start fading out over 2 seconds
    // The second argument to fadeOut here is an anonymous function which is called when fadeOut
    // has finished fading out: it removes the element from the DOM (and page), which is desirable
    // since we can't see it any more anyway, and it stops our page from filling up with hidden
    // divs which use up memory unnecessarily.

    // Note that we use our new GUI-modified timing values from our controls object
    $div.fadeIn( controls.fadeInSpeed ).fadeOut( controls.fadeOutSpeed, function(){
      $(this).remove();
    });

    // Need to increment our counter at the end of every call to putWord()
    counter++;
  };

  // Use setInterval to actually call our putWord function, once every 100ms.
  // Important: note we don't write putWord() here, with parentheses, because
  // that would immediately call our function and pass its *return* value to
  // setInterval as the function setInterval should call every 100ms - and our
  // function returns nothing, so it would be passing 'undefined' to setInterval

  // We keep track of the ID returned by setInterval when we first run it here,
  // so we can cancel it later in our onFinishChange event handler for the GUI slider
  timer = setInterval(putWord, 100);

});
