var markov = {};
var beginnings = [];

var bookFilename = './ulysses.txt';

// Helper function to return a random integer between 0 and max
var randy = function( max ) {
  return Math.floor( Math.random() * max );
};

// Helper function to return a random element from the given array
var choose = function( arr ){
  return arr[ randy(arr.length) ];
};


// Build our Markov chain table by iterating over the given text
var analyse = function( text ){

  var words = text.split(/[ ;\-\n]+/); // split huge string into array of individual words

  for (var i = 0; i < words.length-1; i++) {
    var word = words[i];

    if( !markov[word] ){  //equivalent to if( typeof markov[word] == 'undefined')
      markov[word] =  []; // The key's value must be initialised, otherwise .push won't work
    }

    var nextWord = words[ i + 1 ];  // get the word after this word from the array of words

    markov[word].push( nextWord ); // add that following word to our array of following words for this word

    // keep track of suitable sentence-starting words,
    // by checking that their first letter is uppercase
    if( word.match(/^[A-Z][a-z]/) ){
      beginnings.push(word);
    }

  } //for

};


// Generate a new string from our Markov chain, of the specified length
// We can keep using the same Markov chain lookup we created to generate
// as much new text as we want, and it will all have the same statistical
// relation to the original text
var generate = function (length) {

  var next = choose(beginnings); // Choose a suitable start for our generated text
  var output = next;

  for (var i = 0; i < length; i++) {
    var word = choose( markov[next] );  // Choose a new word based on the current word
    output += ' ' + word; // Append to the string we're building, including a space
    next = word;  // Set the word to use as the key for the next lookup
  }

  return output;
};


$(document).ready(function(){

  // Load our text file over AJAX
  // NOTE: for this to work you will have to run a server on your laptop,
  // i.e. by typing the command 'python -m SimpleHTTPServer' in this folder
  $.ajax(bookFilename)
  .done(function( res ){

    // When our text is loaded, pass it to our Markov-generating function
    analyse( res );

    // Having constructed our Markov chain lookup table, use it to generate some new text!
    var newText =  generate( 60 );

    var $el = $('<p>').text( newText );
    $('#output').append($el);

  })
  .fail(function( err ) {
    // In case of an AJAX error
    console.log('error:', err);
  });


  // Listen for keypresses, and generate new text when enter is pressed
  $( document ).keypress(function (e) {

    // If we want to generate new text only when Enter is pressed, we need to check the keyCode
    // of the kepyress event.
    // If we were just checking for an alphanumeric key, we could do: if( e.key === 'g') or similar
    if( e.keyCode === 13) {

      var newText =  generate( 60 );

      var $el = $('<p>').text( newText );
      $('#output').prepend($el);

    }
  });


});
