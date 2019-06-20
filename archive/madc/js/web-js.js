$(function(){

	$('.toggle-search').on("click", function(){
		$(this).siblings('.search-box').fadeToggle();
	});

	$('.toggle-menu').on("click", function(){
			$('.nav').slideToggle();
		});
});