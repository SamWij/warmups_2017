// Create a function that takes an input and returns Serge's response.
var sergeSays = function(input) {

    // I'm going to use a nested conditional here, because my test for whether serge is yelling is whether the input is
    // identical to the input when uppercased, BUT an empty string ("") is ALSO identical to its self when uppercased.
    if (input === input.toUpperCase()) {

        // He says 'Fine. Be that way!' if you address him without actually saying anything.
        if (input.length === 0) {
            return "Fine, be that way";
        } else {
            // He answers 'Woah, chill out!' if you yell at him (ALL CAPS). I'm testing this before I test whether
            // it's a question, because I feel like Serge would also say "Woah, chill out!" if
            // you yelled a question at him.
            return "Woah, chill out!";
        }

    // Serge answers 'Sure.' if you ask him a question.
    } else if (input.endsWith("?")) {
        return "Sure";
    } else {
        // He says 'Fine. Be that way!' if you address him without actually saying anything.
        return "Whatever";
    }
};

console.log( sergeSays("WHY ARE YOU SUCH A DISAPPOINTMENT, SERGE?") );
