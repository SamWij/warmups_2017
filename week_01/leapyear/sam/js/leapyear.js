console.log("leapyear connected")


let btnSubmit = document.getElementById('btnSubmit')

btnSubmit.onclick = function isLeapYear() {
  //capture user input
  let getLeapYear = document.getElementById('year').value;

  //clear input and display
  document.getElementById('year').value ='';
  document.querySelector('.output').innerHTML='';

  //check if the input is a leapyear
  if ((getLeapYear % 4 === 0) && (getLeapYear % 100 !== 0) || (getLeapYear % 400 === 0)) {
    document.querySelector('.output').innerHTML = (getLeapYear + " is a leap year!")

  } else {
    document.querySelector('.output').innerHTML = (getLeapYear + " is not leap year!")
  }


}




// Write a function that will take any given year and return whether it is a leap year or not.
// Remember that a leap year is:
//
// - Every year that is evenly divisible by 4
// - Except if it is evenly divisible by 100...
// - Unless it is also divisible by 400
//
// Test Data...  Make sure it is working!
//
// - 1997 is not a leap year, it should return false
// - 1996 is a leap year, it should return true
// - 1900 is not a leap year, it should return false
// - 2000 is a leap year, it should return true
//
// How to structure it...
//
// - We want a custom function called isLeapYear
//
// Bonus!
//
// - Ask the user what number they want to test
// - Watch a whole heap of information about leap years... http://www.youtube.com/watch?v=xX96xng7sAE
