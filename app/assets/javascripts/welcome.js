$( document ).ready(function() {

  // Hero content animation
  $('#hero-fade').addClass('animated fadeInUp');
  $(".typedjs").typed({
            strings: ["Drills?", "Screwdrivers?", "Generators?", "Wrenches?", "Expensive Things?", "Tools?" ],
            typeSpeed: 100,
            contentType: 'text',
            backSpeed: 100,
            // time before backspacing
            backDelay: 1400,
            // loop
            loopCount: 2
        });

}); // end of document ready
