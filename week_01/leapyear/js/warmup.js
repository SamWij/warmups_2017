// Every year that is evenly divisible by 4
// Except if it is evenly divisible by 100...
// Unless it is also divisible by 400

var isLeapYear = function(year){

  var result;

  // This test says "if the year is divisible by 4, AND it's either:
  // 1) not divisible by 100, OR
  // 2) (if it is divisble by 100), it's also divisble by 400 " ... then it's a leap year

  if( (year % 4 === 0) && ( year % 100 !== 0 || year % 400 === 0 ) ){
    result = true;
  } else {
    result = false;
  }

  // Here's a longer version which is probably easier to read, but which contains more nesting and more 'else' blocks.
  // Note that the logical conditions are also slightly different (the second two are basically the opposite of the
  // above example)
  //
  // if (year % 4 === 0) {
  //
  //   if( (year % 100 === 0) && (year % 400 !== 0) ) {
  //       result = false;
  //   } else {
  //       result = true;
  //   }
  //
  // } else {
  //   result = false;
  // }

  return result;
};

// The prompt() function creates a popup window in the browser to ask the user a question, and returns
// the answer given (Don't use this in a real website; popup windows are usually very unwelcome!)
var year = prompt("Gie us a year pal:");

console.log( isLeapYear( year ) );
