$(function() {
    var scroller,
    	offset = 0,
        active = 0;

    $('html,body').scrollTop(0);
    var height = $(document).height();
    $('.main').css('height', height + "px");
    $('.main').addClass('mag-ready');

    function setActiveSection() {
        $('.section').removeClass('section__active');
        $('.section').eq(active).addClass('section__active');
        $('.section').eq(active + 1).addClass('section__next');

        offset = offset + $('.section').height();
        listenForScroll($('.section').eq(active));
    }

    function listenForScroll(element) {
        scroller = new Waypoint({
            element: element,
            handler: function(direction) {
                if (direction == "down") {
                	movePage();
                }
            },
            offset: '-100%'
        })
    }

    function movePage() {
        active++;
        $('.section').eq(active).css('transform', 'translateY(' + offset + 'px)');
        $('.section').removeClass('section__next');
        setActiveSection();
    }

    setActiveSection();
})
