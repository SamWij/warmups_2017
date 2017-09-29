// Write a program that can calculate the sum of the first n elements of the following sequences:
//
// s1 = 1 - 1 + 1 - 1 + 1 - 1 + //etc
// s2 = 1 + 2 + 3 + 4 + 5 + 6 + //etc
// For example:
//
// s1(4) = 0
// s2(4) = 10

var s1 = function(n) {
// s1 = 1 - 1 + 1 - 1 + 1 - 1 + //etc

  var sum = 0;
  // This will work...

  // for (var i = 1; i <= n; i++) {
  //   if ((i % 2) === 0) {
  //     sum += 1;
  //   } else {
  //     sum -= 1;
  //   }
  // }

  // But you might've picked up on the pattern that, if n is even, the value to be returned will be 0, else the value returned will be 1.

  // if (n % 2 === 0) {
  //   return 0;
  // } else {
  //   return 1;
  // }

  // Here's the same if/else statement represented as a ternary.

  return n % 2 === 0 ? 0 : 1;
};

var s2 = function(n) {
// s2 = 1 + 2 + 3 + 4 + 5 + 6 + //etc

  // This will work...

  // var sum = 0;
  // for (var i = 1; i <= n; i++) {
  //   sum += i;
  // }
  // return sum;

  // But this is such a common that it has it's own Wikipedia article!
  // https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF

  return (n * (n + 1) / 2);
};


console.log(s1(5));
console.log(s2(5));
