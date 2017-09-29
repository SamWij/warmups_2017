var scrabble = {

    // FIRST APPROACH: USING AN OBJECT WHERE THE VALUES ARE ARRAYS OF TILE CHARACTERS AND THE KEYS ARE THE CORRESPONDING TILE VALUES. This is gross, because we the term 'value' has different meaning depending on whether we're talking about our letterScores object or the game of scrabble)


    score: function(word) {
        // Make the word uppercase so we can easily compare it to the values in our letterScores arrays.
        word = word.toUpperCase();
        // Create an initial value for the variable "sum", which we will add scores to and return at the end.
        var sum = 0;
        // Iterate over the word, looking at each character in the word in turn.
        for (var i = 0; i < word.length; i++) {
            // Every iteration, declare a variable called 'letter', which is the character in the word we're looking at.
            var letter = word[i];
            // Get the keys (ie scores) from the letterScores object.
            var keys = Object.keys(this.letterScores);
            // Iterate over each key (ie,  1, 2, 3, 4, 5, 8, 10) and...
            // you could also you use a for( var key in this.letterScores) instead of iterating over the array returned by Object.keys(this.letterScore) above
            for (var j = 0; j < keys.length; j++) {
                var key = parseInt(keys[j]);
                // Check to see if this letter in the word is present in the array of tiles that have this score.
                if (this.letterScores[key].includes(letter)) {
                    console.log(letter, " gets a ", key);
                    // If so, add that score to the sum.
                    sum += key;
                }
            }
        }
        // Return the sum.
        return sum;
    },

  letterScores: {
        1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
        2: ["D", "G"],
        3: ["B", "C", "M", "P"],
        4: ["F", "H", "V", "W", "Y"],
        5: ["K"],
        8: ["J", "X"],
        10: ["Q", "Z"]
    },


    // SECOND APPROACH: USING AN OBJECT WHERE EACH TILE CHARACTER IS A KEY WITH A SINGLE, CORRESPONDING VALUE. While it takes longer to set up the data structure, the resulting code is a lot cleaner.

    scoreAlternative: function(word) {
        word = word.toLowerCase();
        var sum = 0;

        for (var k = 0; k < word.length; k++) {
            var letter = word[k];
            var letterScore = this.letterScoresAlternative[letter];
            console.log(letter, " gets a ", letterScore);
            sum += letterScore;
        }
        return sum;
    },

    letterScoresAlternative: {
        'a' : 1, 'e' : 1, 'i' : 1, 'o' : 1,
        'u' : 1, 'l' : 1, 'n' : 1, 'r' : 1,
        's' : 1, 't' : 1, 'd' : 2, 'g' : 2,
        'b' : 3, 'c' : 3, 'm' : 3, 'p' : 3,
        'f' : 4, 'h' : 4, 'v' : 4, 'w' : 4,
        'y' : 4, 'k' : 5, 'j' : 8, 'x' : 8,
        'q' : 10, 'z' : 10
    }
};

console.log(scrabble.score("cabbage"));
console.log(scrabble.scoreAlternative("cabbage"));
