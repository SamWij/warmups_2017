console.log('scrabble')

var scrabbleScore = {
        'a' : 1, 'e' : 1, 'i' : 1, 'o' : 1,
        'u' : 1, 'l' : 1, 'n' : 1, 'r' : 1,
        's' : 1, 't' : 1, 'd' : 2, 'g' : 2,
        'b' : 3, 'c' : 3, 'm' : 3, 'p' : 3,
        'f' : 4, 'h' : 4, 'v' : 4, 'w' : 4,
        'y' : 4, 'k' : 5, 'j' : 8, 'x' : 8,
        'q' : 10, 'z' : 10
    }

function scrabble(word) {
  let sum = 0;
  let scrabbleWord = word.toLowerCase().split('')

    for (var i = 0; i < scrabbleWord.length; i++) {

      sum += scrabbleScore[scrabbleWord[i]]

    }

    console.log(sum)
}

scrabble("cabbage");

// Examples
//
// "cabbage" should be scored as worth 14 points:
//
// 3 points for C
// 1 point for A, twice
// 3 points for B, twice
// 2 points for G
// 1 point for E
// And to total:
//
// 3 + 2*1 + 2*3 + 2 + 1
// = 3 + 2 + 6 + 3
// = 5 + 9
// = 14
