console.log("serge says")

// Serge answers 'Sure.' if you ask him a question.
//
// He answers 'Woah, chill out!' if you yell at him (ALL CAPS).
//
// He says 'Fine. Be that way!' if you address him without actually saying anything.
//
// He answers 'Whatever.' to anything else.
//
// Create a function that takes an input and returns Serge's response.
var output;

function sergeSays(input) {
  if (input === "") {
    output = "Fine. Be that way!"
  } else if (input === input.toUpperCase()) {
    output = "Woah, chill out!"
  } else if (input.includes('?')  ) {
    output = "Sure."
  } else  {
    output = "Whatever."
  }

}


sergeSays('want some lunch?')

console.log(output)
