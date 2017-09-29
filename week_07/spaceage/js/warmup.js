
var SpaceAge = function( seconds ){

  this.seconds = seconds;
  this.yearsOnEarth = seconds / 31557600;
  this.earthToOtherPlanets = {
    Mercury: 0.2408467 ,
    Venus: 0.61519726 ,
    Mars: 1.8808158 ,
    Jupiter: 11.862615 ,
    Saturn: 29.447498 ,
    Uranus: 84.016846 ,
    Neptune: 164.79132
  };

  this.yearsOnAllPlanets = function() {
    // var arr = [];
    for (var planet in this.earthToOtherPlanets){
    console.log( planet  + " years: " + this.yearsOnEarth / this.earthToOtherPlanets[planet] );
    }
    // return arr;
  };

  this.yearsOnPlanet = function( planet ){
    var yearsOnEarth = this.yearsOnEarth;
    var ratio = this.earthToOtherPlanets[ planet ];
    var yearsOnOtherPlanet = yearsOnEarth / ratio;
    return yearsOnOtherPlanet;
  };
};

var age = new SpaceAge( 1000000000 );  // Don't forget the 'new'!

console.log( age.yearsOnEarth );
console.log( age.yearsOnPlanet( 'Mercury' ));

console.log( age.yearsOnAllPlanets() );
age.yearsOnAllPlanets();
