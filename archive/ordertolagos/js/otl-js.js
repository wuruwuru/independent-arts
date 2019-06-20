$(function(){

	$(document).on("click", ".toggle-edit", function() {
		$(this).parent("li").toggleClass("contract");
	})

	$(document).on("click", ".remove-item", function() {
		if($(".add-items li").length == 1){
		$(this).siblings("input, textarea").val("");
		} 
		else {
		$(this).parent("li").remove();
		}
	})

	$(".add-item").on("click", function(){

		$(".add-items li").addClass('contract');

		$(".add-items li").eq(0).clone()
	  	.attr({
	  		'class': ""
	  	}).find("input, textarea").each(function() {
	    $(this).val("");
	  }).end().appendTo(".add-items");

	})

	$("a[rel=order-products]").on("click", function(){
		$(".stage").removeClass("two");
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
	})

	$("a[rel=order-status]").on("click", function(){
		$(".stage").addClass("two");
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
	})

	$(".add-to-cart-btn").on("click", function(e){
		e.preventDefault();
		$(this).parent().siblings(".add-to-cart").toggleClass("show");
	})

	$(".add-to-cart .confirm").on("click", function(e){
		e.preventDefault();
		$(this).parent(".add-to-cart").toggleClass("show");
	})

	$(function() {
	$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" });		
	});

})