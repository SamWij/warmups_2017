
var anagram = {

  anagrams: [],


  // Our trick will be to use the Array.sort method, in conjunction with String.split and Array.join. If we sort the characters of a word's anagram, the word and the anagram will be ===. The problem is: (1) we cannot sort a string, so we have to 'split' it into an array of characters; (2) we can't compare two arrays to see if the elements within those arrays match, since one array will never === another array (since they are different JavaScript objects), so we need to "join" the sorted array of characters back into a string before comparing them.
  sort: function( str ){
    return str.split('').sort().join('');
  },

  checkForAnagrams: function( word, wordArray ){

    word = word.toLowerCase();

    for (var i = 0; i < wordArray.length; i++) {

      var potentialAnagram = this.sort( wordArray[i] );

      if( this.sort( word) === potentialAnagram ) {
        this.anagrams.push( wordArray[i] );
      }
    }

    console.log(this.anagrams);
    return this.anagrams;
  }

};

var arrayOfWords = ['enlists', 'google', 'badger', 'cheaters', 'inlets', 'banana', 'hectares', 'steachers'];

console.log( anagram.checkForAnagrams( 'teachers', arrayOfWords ));
