$(function() {
    var searchbar_shown = false;

    function hideSearch(e) {
        var container = $('.search-bar');
        var close_button = $('.close-search i');

        if (close_button.is(e.target) || (!container.is(e.target) && container.has(e.target).length === 0)) {
            container.addClass('slideOutUp');
            setTimeout(function() {
            	container.removeClass('visible slideOutUp');
            	$(document).unbind('mouseup', hideSearch);
            }, 300);
        }
    }

    $('.search-trigger').click(function(e) {
        e.preventDefault();

        if (!searchbar_shown) {
            $('.search-bar')
                .addClass('visible')
                .find('input').focus();

            $(document).mouseup(hideSearch);
            $('.close-search').click(hideSearch);
        }
    });
})
