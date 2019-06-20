$(function(){
  setTimeout(function() {
    $('.logo').removeClass('stage1');
  }, 2000);
  setTimeout(function() {
    $('#main').removeClass('hide');
  }, 3000);

  $('#main').smoothState();

  $('.text').waypoint(function() {
    $(this).addClass('animated fadeInUp');
  }, { offset: '50%' });
});

// Contents of functions.js
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        // Runs when a link has been activated
        onStart: {
          duration: 400, // Duration of our animation
          render: function (url, $container) {
            $('.intro').addClass('animated fadeOut');
            $('.home-menu').addClass("animated slideOutDown");
            // Scroll user to the top
            $body.animate({
              scrollTop: 0
            });
          }
        }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);