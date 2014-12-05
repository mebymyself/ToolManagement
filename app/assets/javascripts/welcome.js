$(document).on('page:load ready', function() {

  // Hero content animation
  $('#hero-fade').addClass('animated fadeInUp');
  $(".typedjs").typed({
            strings: ["Drills?", "Screwdrivers?", "Generators?", "Wrenches?", "Compressors?", "Tools?" ],
            typeSpeed: 100,
            contentType: 'text',
            backSpeed: 100,
            // time before backspacing
            backDelay: 1400,
            // loop
            loopCount: 2
        });
  $('.time-now').text(moment().format('ha'));
  
}); // end of document ready
