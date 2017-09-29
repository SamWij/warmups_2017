
var nucleotides  = ['A', 'C', 'G', 'T', 'U'];

var validNucleotides = false;

var nucleotideCounter = function(string, letter){
  // despite the name, this is actually a general function that counts the occurrences of any character in any string
  var count = 0;
  for (var i = 0; i < string.length; i++){
    if (string[i] === letter){
      count += 1;
      // we're setting a global variable here, which this function assumes exists;
      // it would be better not to make such assumptions about globals
      validNucleotides = true;
    }
  }
  return count;
}

var getNucleotideCount = function( str ){

  // our array of nucleotides are in uppercase, so we had better convert
  // the input string to uppercase before testing it against our nucleotides
  str = str.toUpperCase();

  var result = '';

  // iterate over every nucleotide in the array
  for (var i = 0; i < nucleotides.length; i++){

    var nucleotide = nucleotides[i];
    var count = nucleotideCounter(str, nucleotide);  // get the count for the current nucleotide

    if(count > 0){
      // we will only show a count for nucleotides which do appear
      result += (nucleotide + ": " + count + "\n");
    }

  } //end for

  // test whether there were any valid nucleotides
  if (validNucleotides) {
    return result;
  } else {
    return "No valid nucleotides.";
  }

};

console.log( getNucleotideCount( "DAAKDCKTU" ) );
