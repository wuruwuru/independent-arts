$(function(){
  setTimeout(function() {
    $('.logo').removeClass('stage1');
  }, 100);
  setTimeout(function() {
    $('#main').removeClass('hide');
  }, 200);

  $('#main').smoothState();
});

// Contents of functions.js
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        // Runs when a link has been activated
        onStart: {
          duration: 250, // Duration of our animation
          render: function (url, $container) {
            $('.home-menu').addClass("animated fadeOutDown");
            // Scroll user to the top
            $body.animate({
              scrollTop: 0
            });
          }
        }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);