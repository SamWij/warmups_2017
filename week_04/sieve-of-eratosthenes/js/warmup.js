
// For more information see here: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

var sieve = {

  nums: [],
  counter: 0,

  calculate_primes: function( max ){

    // Initialise our range of primes; setting their value to true means we assume they're all
    // primes before we start testing them
    for (var i = 0; i < max; i++) {
      this.nums[i] = true;
    }

    for (var i = 2; i < this.nums.length; i++) {

      // 'currentNum' is a bit clearer than 'i'
      var currentNum = i;

      // Now loop through all the remaining numbers, testing whether they're divisible
      // by currentNum
      for (var j = currentNum + 1; j < this.nums.length; j++) {

        this.counter++;

        if ( this.nums[j] === true && j % currentNum === 0 ){
          // If the number is divisible (i.e. remainder of 0) it's not a prime
          this.nums[j] = false;
       }

      } // inner for
    } // outer for


    // Print our final list of primes
    for (var i = 0; i < this.nums.length; i++) {
      if( this.nums[i] === true ){
        console.log(i);
      }
    }

    // Note the number of iterations involved; it grows exponentially as the range of numbers
    // gets larger (this is a common pattern when nested loops are involved); is there a more
    // efficient way to implement this sieve algorithm?
    console.log('iterations: ', this.counter);

  }
};

sieve.calculate_primes(1000);
