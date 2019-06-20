$(function(){

	//Animate Opacity

	var objHeight = $(".animateOpacity").outerHeight();

	$(window).scroll(function () {

	    scrollTop  = $(window).scrollTop();

		if (scrollTop < objHeight) {
	    	var objOpacity = 1 - (scrollTop / objHeight * 1.2);
		   	$('.animateOpacity').css("opacity", objOpacity);
		}
	}) 

	//Smooth Scrolling
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});