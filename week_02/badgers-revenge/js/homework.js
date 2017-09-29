
var revengeOfBadger = {

  students: {
    Tony: 3,
    Ron: 3,
    Cedric: 0,
    Louis: 0,
    Shaila: 0,
    Libby: 5,
    Michael: 0,
    Meggan: 0
  },

  candidates: [],

  getCandidates: function() {
    // iterate over the keys of the students object and create a shortlist of candidates
    for( var student in this.students ){
      if( this.students[ student ] > 2 ){
        this.candidates.push( student ); // a student goes into the shortlist if they clapped more than twice
      }
    }
  },

  draw: function() {

    this.candidates = [];
    var winner;
    this.getCandidates();
    var numberOfCandidates = this.candidates.length;

    if ( numberOfCandidates === 0 ){
      // we'll force Badger to do his own damn warmup if he's terrorised everyone into not clapping, the tyrant
      winner = "Badger";
    } else {
      // do the draw:
      // get a random floating-point between 0 and the last index of the array, and turn it into an integer
      var random = Math.floor( Math.random() * numberOfCandidates );
      winner = this.candidates[ random ];
    }

    console.log("Lucky " + winner + ", you'll be doing the warmup today! Congrats.");
    return winner;
  }

}; // end revengeOfBadger{}

console.log( revengeOfBadger.draw() );
