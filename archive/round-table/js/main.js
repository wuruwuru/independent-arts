$(function() {
    $('body').removeClass('loading').find('.wave').show();

    var width = $('body').outerWidth();

    if (width > 600) {
        $(".main").onepage_scroll({
            loop: false,
            beforeMove: function(index) {
                var newBgClass = 'state-' + index;
                $('body').removeClass().addClass(newBgClass);
                if (index != 3) {
                    $('.column').fadeOut('fast');
                }
            },
            afterMove: function(index) {
                if (index == 3) {
                    $('.column').show();
                }
            }
        });
    }
})
