
var reverser = function( arr ){

  var reversed = [];

  // This version uses a for loop which runs backwards, starting at the end of our input array
  // for (var i = arr.length - 1; i >= 0; i-- ){
  //   reversed.push( arr[i] );
  // }

  // unshift adds an element to the front of an array, so our for loop can count
  for (var i = 0; i < arr.length; i++) {
    reversed.unshift( arr[i] );
  }

  return reversed;
}


var flatten = function( arr ){

  var flattened = [];

  for (var i = 0; i < arr.length; i++) {

    var currentElement = arr[i];

    if ( currentElement instanceof Array) {

      // loop over nested array and add each of its elements to our result array
      for (var j = 0; j < currentElement.length; j++) {
        flattened.push( currentElement[j] );
      }

      // Fancy combination of concat and recursion via Michael Lin:
      //flattened = flattened.concat( flatten(currentElement) );

    } else {
      // simple case, just push flat element onto our result array
      flattened.push( currentElement );
    }


  } // outer for loop

  return flattened;
};

// Here's how you would do it if you *were* allowed to some array functions:
var flattened = [[0, 1], [2, 3], [4, 5], 6, 7, 8].reduce(function(a, b) {
  return a.concat(b);
}, []);
console.log(flattened);


console.log( reverser( [1,2,3,4,5,6,7,8] ) );

console.log( flatten( [1,2,3,4, [11,12,13], 5,6, ['a','b','c'] ] ) );
