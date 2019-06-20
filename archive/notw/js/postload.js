;(function($,win,doc) {
	"use strict";
	
	var name="imgpostload",
		version="1.0",
		defaults = {
			alternateImgAttribute : 'data-imgpostload-src',
			alternateBgClassAttribute: 'data-imgpostload-class',
			loadDom : $(win),
			loadEvent : 'load',
			fillerImg : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
		};
	

	$.fn.imgpostload = function( opts ) {
		
		var $elements = $(this);
		defaults = $.extend( defaults, opts );

		$(doc).ready(function(){
			
			$elements.each( function() {
				var $this = $(this);
				if( $this.is('img')) {
					$this.attr('src', defaults.fillerImg);
				}
			});

		});

		defaults.loadDom.on(defaults.loadEvent, function(){
			$elements.each( function() {
				var $this = $(this);
				if ( $this.is('img')) {
					$this.attr('src', $this.attr(defaults.alternateImgAttribute) );
				}
				else {
					$this.addClass( $this.attr(defaults.alternateBgClassAttribute) );
				}
			});
		});

		return this;
	}

})(jQuery,window,document);

$(document).ready(function() {
	$('body *').imgpostload();
});