$(document).on('page:load ready', function() {

  // Hero content animation
  $('#hero-fade').addClass('animated fadeInUp');
  $(".typedjs").typed({
            strings: ["drills?", "screwdrivers?", "generators?", "wrenches?", "tools?" ],
            typeSpeed: 50,
            contentType: 'text',
            backSpeed: 50,
            // time before backspacing
            backDelay: 1700,
            // loop
            loopCount: 2
        });
  $('.time-now').text(moment().format('ha'));
  
}); // end of document ready
