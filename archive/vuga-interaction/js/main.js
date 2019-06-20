//Simple page transitions
$(function(){
	// Animation
	var slider = $('.tags');
	var slides = $('.tags ul li');
	var lastElem = $('.tags ul li').length - 1;

	slides.first().addClass('active');

	function runAnimation(target){
		slides.removeClass('active')
				.eq(target).addClass('active')
	}

	function sliderTiming() {
		target = $('.tags ul li.active').index();
		target === lastElem ? target = 0 : target = target+1;
		lastKey = target;
		runAnimation(target);
	}

	var timingRun = setInterval(function() { sliderTiming(); }, 2000);
	function resetTiming() {
		clearInterval(timingRun);
		timingRun = setInterval(function() { sliderTiming(); }, 2000);
	}
	function stopTiming() {
		clearInterval(timingRun);
	}

	slider.mouseenter(function(){
		stopTiming();
	})

	slides.mouseenter(function(){
		runAnimation($(this).index());
	})

	slider.mouseleave(function(){
		setTimeout(function() {
			resetTiming();
		}, 500);
	})
})
