
var happy = function ( num ) {

  var cycle = [];
  var squareSum = num;

  var count = 0;

  while(true){
    squareSum = sumOfDigitSquares( squareSum );

    if( squareSum === 1 ){
      // found a happy number
      console.log('Happy number took: ', count);
      return true;
    }

    if( cycle[squareSum] === true ){
      // detected repeating pattern: not a happy number
      console.log('Unhappy number %d: %d', num, count);
      return false;
    }

    cycle[squareSum] = true;
    count++;
  }
};

var sumOfDigitSquares = function ( num ) {

  var numStr = num.toString();
  var sum = 0;


  var i = numStr.length;
  while(i--){
    sum += +numStr[i] * +numStr[i];
  }

  // Here's a fancier way to get the individual digits of the number without converting it
  // to a sting first, by using modulus
  // var digit;
  // while (num > 0) {
  //   digit = num % 10 ;
  //   sum += digit * digit ;
  //   number = (number  - digit) / 10 ;
  // }

  return sum;
};


var found = 0;

for (var i = 0; found < 1000; i++) {

  if( happy(i) ){
    found++;
    console.log('Found happy number #%d: %d', found, i);
  }
}
