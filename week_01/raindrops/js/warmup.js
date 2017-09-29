// RAINDROPS

// Start with the input we want to convert to raindrops, and store that in a variable called 'input' - that way,
// if we want to test a _different_ value, we don't have to change the value throughout the program, just in this one spot.
var input = 1755;

// We're going to declare a variable called 'output' and assign that the value of an empty string.
// There's two reasons for this - firstly, we know that we want out program to output a string,
// to which the program will be adding _other_ strings as it's executed.
// Secondly, we want to test whether the input was evenly divisible by 3, 5 or 7,
// since the output of the program changes depending on that condition - if we call JavaScript's
// "String.length" property on an empty string, it will return 0.
var output = "";

// The modulus operator divides the number to the left of the operator by the number to the right of
// the operator and returns the remainder. So, 4 % 2 evalutes to 0, since 4 is evenly divisible by 2.
// 4 % 3 evaluates to 1, since 4/3 = 1, with a remainder of 1. We'll use the strict equality operator (===)
// to test whether the input is evenly divisible by 3, 5 and/or 7 (in succession)
if (input % 3 === 0) {
    // The += operator takes the value to the left of the operator, adds the value to the right of the
    // operator to it and then assigns the result of that operation to the first value.
    output += "Pling";
    // This is the same as: output = output + "Pling"
}

// We don't want to use the if / else if structure here because we want to test each condition in succession,
// regardless of whether the previous condition evaluated to true - using an if / else if structure, as soon as
// one condition is met, no subsequent conditions are tested, which is no good here.
if (input % 5 === 0) {
    output += "Plang";
}

if (input % 7 === 0) {
    output += "Plong";
}

// If the input was not divisible by 3, 5 or 7, no strings will have been appended to output - ie, it will be
// an 'empty string'. The String.length property counts the number of characters in a string, so if
// output.length evaluates to 0, we know the input was not divisible by 3, 5 or 7.
if (output.length === 0) {
    // This is called 'explicit type coersion' - we're taking a number and saying "give me the
    // string representation of this number."
    console.log( input.toString() );
} else {
    console.log( output );
}
