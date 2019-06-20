var CanvasImage=function(e,t)
{
	this.image=t,
	this.element=e,
	this.element.width=this.image.width,
	this.element.height=this.image.height;
	var n=navigator.userAgent.toLowerCase().indexOf("chrome")>-1,
	r=navigator.appVersion.indexOf("Mac")>-1;
	n&&r&&(this.element.width=Math.min(this.element.width,300),this.element.height=Math.min(this.element.height,200)),
	this.context=this.element.getContext("2d"),
	this.context.drawImage(this.image,0,0)
};
CanvasImage.prototype={
	blur:function(e){
		this.context.globalAlpha=.5;
		for(var t=-e;t<=e;t+=2)
			for(var n=-e;n<=e;n+=2)
				this.context.drawImage(this.element,n,t),
			n>=0&&t>=0&&this.context.drawImage(this.element,-(n-1),-(t-1));
			this.context.globalAlpha=1
		}
},

$(function(){
	var image,canvasImage,canvas;
	$(".blur").each(function(){
		canvas=this,
		image=new Image,
		image.onload=function(){
			canvasImage=new CanvasImage(canvas,this),
			canvasImage.blur(4)
		},
		image.src=$(this).attr("src");
	});

	$('.reveal_menu').on("click", function() {
		$(this).siblings('.menu').fadeToggle(100);
		$(this).children('span').toggleClass('entypo-menu');
		$(this).children('span').toggleClass('entypo-cancel');
	});

	$('.grumi_playlist').hide();

	$('.playlist_toggle').on("click", function() {
		$(this).toggleClass('active');
		$('.grumi_playlist').slideToggle(100);
	})

	$(document).on("click", ".preview", function() {
		$(this).children('span').toggleClass('entypo-play');
		$(this).children('span').toggleClass('entypo-stop');
	});

	$(document).on("click", ".toggle_share", function() {
		$(this).closest('.wrap').children('.share').fadeToggle();
	});

  $(".show_reply").on("click", function(){
  	$(this).siblings("p").fadeToggle(100);
  	$(this).children("span").toggleClass("entypo-down-open-mini");
  	$(this).children("span").toggleClass("entypo-up-open-mini");
   })

  $(".search_toggle").on("click", function() {
  	$(this).siblings('.search').fadeToggle(100).children('.search_field').focus();
  })

  $(".close_search").on("click", function() {
  	$(this).siblings('.search_field').val('')
  		.parent('.search').fadeToggle(100);
  })

  $(".load-more").on("click", function() {
  	$(this).toggleClass("loading") })

  $("#_details").children(".new-comment").on("click", function(){
  	$(this).addClass("focused");
  })

	for (var c=1; c<9; c++) {

	  $("#song").clone()
	  	.attr({
	  		'class': "listing small-12 large-3 columns left"
	  	}).find(".image-cover a img").each(function() {
	    $(this).attr({
	     'src': "img/cover" + c + ".jpg"
	    });
	  }).end().appendTo(".catalogue");


	  $("#song1").clone()
	  	.attr({
	  		'class': "listing small-12 large-4 columns left"
	  	}).find(".image-cover a img").each(function() {
	    $(this).attr({
	     'src': "img/cover" + c + ".jpg"
	    });
	  }).end().appendTo(".catalogue");


	  $("#conversation0").clone().removeClass("has_image")
	  	.find("img").each(function() {
	  		$(this).remove(); })
	  		.end().appendTo(".conversation-grid");

	}

	for (var c=1; c<4; c++) { 
		$("#song2").clone()
	  	.attr({
	  		'class': "listing small-12 large-3 columns left"
	  	}).find(".image-cover a img").each(function() {
	    $(this).attr({
	     'src': "img/cover" + c + ".jpg"
	    });
	  }).end().find(".col_count").each(function() {   $(this).text(c + 1); }).end().appendTo(".collection");

	  	$("#song4").clone()
	  	.attr({
	  		'class': "listing small-12 large-4 columns left"
	  	}).find(".image-cover a img").each(function() {
	    $(this).attr({
	     'src': "img/cover" + c + ".jpg"
	    });
	  }).end().find(".col_count").each(function() {   $(this).text(c + 1); }).end().appendTo(".catalogue");
	}

	for (var c=1; c<3; c++) {
		$("#conversation1").clone()
	  		.appendTo(".conversation-grid");
	}

});

// Dropdown

function DropDown(el) {
	this.dd = el;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			event.stopPropagation();
		});	
	}
}

$(function() {

	var dd = new DropDown( $('#dd') );

	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown-2').removeClass('active');
	});

});


$(function() {
	$('a[rel*=leanModal]').leanModal({ top : 200, closeButton: ".modal_close" });		
});
