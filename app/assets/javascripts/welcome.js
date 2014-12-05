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
  smoothScroll.init({
        speed: 1500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 0
    });
  
}); // end of document ready
