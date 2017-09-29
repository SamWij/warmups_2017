var app = {
  pics: [],
  maxPhotos: 0
};

var randy = function( max ) {
  return Math.floor( Math.random() * max );
};


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var generateURL = function (photo, size) {
    size = size || 'h'
    return [
      'http://farm',
      photo.farm,
      '.static.flickr.com/',
      photo.server,
      '/',
      photo.id,
      '_',
      photo.secret,
      '_',
      size,
      '.jpg'
    ].join('');
};


$(document).ready(function () {


  var slideshow = function(){

    // get a random index into the array of photos
    var rand = randy( app.pics.length );

    console.log( generateURL(app.pics[rand]) );

    // Create a new DIV element, set the background-image URL, and append it to the page, fading in
    var $div = $('<div/>', {
      style: 'background-image: url(' + generateURL(app.pics[rand], 'b') + ');',
      class: 'fullscreen'
    })
    .appendTo('body')
    .fadeIn(5000);

    // BONUS: place a smaller version of the image randomly on the screen
    // Note that we use the .load() event handler from jQuery so we can get the actual width and height
    // of the image (this.height, etc); this lets us constrain our random placement so that the image always
    // fits on the screen

    // var $i = $('<img>', {src: generateURL(app.pics[rand], 'z') }).css({
    //   position: 'absolute',
    //   display: 'none',
    //   borderRadius: '10px',
    // })
    // .load(function(){
    //   $(this).css({
    //     top: randy( window.innerHeight - this.height) + 'px',
    //     left: randy( window.innerWidth - this.width) + 'px'
    //   }).appendTo('body').fadeIn(4000); //fadeOut(20000);
    // });

    // You should probably add the following code as the second argument to
    // fadeIn() to start removing the old DIVS, which otherwise will just sit around
    // in memory for no reason

    // , function(){
    //   // when fade-in complete
    //   if( $('div').length > 2) {
    //     $('div').first().remove();
    //   }
    // });

  };

  // Grab the search text supplied by the 'search' querystring key, or if that is not
  // defined (i.e falsey), use a default value
  var search = getParameterByName('search') || 'dogs';

  $.getJSON('https://api.flickr.com/services/rest/?jsoncallback=?', {
    method: 'flickr.photos.search',
    api_key: '2f5ac274ecfac5a455f38745704ad084',
    text: search,
    format: 'json',
    page: 1
  }).done(function (results) {

    app.pics = results.photos.photo;
    //var a = new Audio('eclipse.mp3').play(); // Heartrending soundtrack

    // Start the slideshow as soon as we have our API results, and keep running
    // the slideshow function every 5 seconds
    slideshow();
    setInterval(slideshow, 5000);
  });


});
