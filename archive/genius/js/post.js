$(window).load(function () {
    var $post = $(".full-post");
    var $body = $(".post-body");

    var body_offset = $body.offset().top;
    var body_height = $body.height();

    var body_bound_top = body_offset;
    var body_bound_bottom = body_offset + body_height - 200;

    var share_sidebar_fixed = false;

    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var within_view = scrolled > body_bound_top && scrolled < body_bound_bottom;

        if (!share_sidebar_fixed && within_view) {
            share_sidebar_fixed = true;
            $post.find('.post-share-sidebar').addClass('fixed');
        } else if (share_sidebar_fixed && !within_view) {
            share_sidebar_fixed = false;
            $post.find('.post-share-sidebar').removeClass('fixed');
        }
    });
})