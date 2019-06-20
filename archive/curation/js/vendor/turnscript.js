$(document).ready(function() {


    $('#intro').click(function(){
      $(this).fadeToggle('fast');
    })

    $('.reveal-menu').click(function(){
      $('.menu').slideToggle('fast');
      $('.reveal-menu').toggleClass('retract');
    })

    $('.menu li:nth-of-type(odd)').hover(function(){
      $('.bg.small').toggleClass('expand');
    })

    $('.menu li:nth-of-type(even)').hover(function(){
      $('.bg.large').toggleClass('contract');
      $('.bg.small').toggleClass('transparent');
    })

    $('a.control').click(function(){
    	$(this).toggleClass('clicked');
    	$(this).siblings('.jobs p.details').slideToggle();
    })

    $('.filtering li').click(function(){

      var text = $(this).text();

      $('.viewing p').text('Viewing ' + text );
      $('.viewing').slideDown('fast');

      setTimeout(function() {
        $('.viewing').fadeOut('fast');
        }, 3000);
    })

    $('#content').mixitup({
    animateGridList: false,
    transitionSpeed: 600,
    ease: 'snap',
    targetSelector: '.profile',
    effects: ['fade'],
    onMixStart: function(){
    $(".profile").toggleClass('flipped');
    },
    onMixEnd: function(){
    $(".profile").toggleClass('flipped');
    }
  });

  
  });


$(function(){
	
	// Checking for CSS 3D transformation support
	$.support.css3d = supportsCSS3D();
	

	// Listening for clicks on the ribbon links
	$('').click(function(e){
		
		// Flipping the forms
		$(".profile").toggleClass('flipped');
		
		// If there is no CSS3 3D support
		if(!$.support.css3d){
			('.profile .front').toggle();
		}
		e.preventDefault();
	});
	
		$('').click(function(e){
		
		// Flipping the forms
		$('.profile').toggleClass('flipped');
		
		// If there is no CSS3 3D support, simply
		// hide the login form (exposing the recover one)
		if(!$.support.css3d){
			('.profile .front').toggle();
		}
		e.preventDefault();
	});
	
	
	// A helper function that checks for the 
	// support of the 3D CSS3 transformations.
	function supportsCSS3D() {
		var props = [
			'perspectiveProperty', 'WebkitPerspective', 'MozPerspective'
		], testDom = document.createElement('a');
		  
		for(var i=0; i<props.length; i++){
			if(props[i] in testDom.style){
				return true;
			}
		}
		
		return false;
	}
});
