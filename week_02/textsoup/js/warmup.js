
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
  var text = words[randomIndex];

  // Insert the random word as the content of a new div
  var $div = $('<div class="word">').html( text );

  // Set some CSS properties dynamically
  // (i.e. set the div's position to be random)
  // Note that you can pass an object literal to the .css() jQuery function,
  // so you can specify many CSS properties at once
  $div.css({
    top: randy( window.innerHeight ) + 'px',
    left: randy( window.innerWidth ) + 'px',
    fontSize: (40 + randy(80)) + 'px'  // note that in a CSS file you would use the property 'font-size'
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
  $div.fadeIn(1000).fadeOut(2000, function(){
    $(this).remove();
  });

};

// Use setInterval to actually call our putWord function, once every 100ms.
// Important: note we don't write putWord() here, with parentheses, because
// that would immediately call our function and pass its *return* value to
// setInterval as the function setInterval should call every 100ms - and our
// function returns nothing, so it would be passing 'undefined' to setInterval
setInterval(putWord, 100);
