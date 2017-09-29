var atBash = function(input) {

  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  // Array.reverse is a destructive method, meaning we can't just store alphabet.reverse() in a new variable (eg reverse = alphabet.reverse()). Both alphabet and reverse will point to the same object.

  // There's a few ways to get around this.

  // Method 1: The Array.slice method returns a new array, and if we pass no arguments into the method (eg alphabet.slice()), it will return a new array with all the elements of the original array. We can then reverse this new array.
  var reverse = alphabet.slice().reverse();

  // Method 2: The Array.concat method will join all the elements of the array on which it was called with the elements of the array passed in as an argument to the method. If we create a new, empty array, and call the .concat method on it, passing in the alphabet array, it will join the empty array with the alphabet array (which is effectively just creating a copy of the alphabet array), then reverse the resulting array:
  // var reverse = [].concat(alphabet).reverse();

  // Downcase the input to make sure the characters match the casing of the alphabet array characters and split the resulting stringstring into an array of characters.
  input = input.toLowerCase().split("");
  // Create an empty string to which we can add encoded characters using string concatenation (+=)
  var message = "";
  // Iterate over each element in the input array and...
  for (var i = 0; i < input.length; i++) {
    // ...get the index of that element in the alphabet, and...
    var index = alphabet.indexOf(input[i]);
    // ...get the character at the corresponding index in the reversed alphabet, and ...
    var cipherCharacter = reverse[index];
    // ... add that character to the end of the message string.
    message += cipherCharacter;
  }

  return message;
};



console.log(atBash("kitten"));
