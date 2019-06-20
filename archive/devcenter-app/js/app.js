$(function() {

    //Mobile Nav
    $('.mobile-nav-toggle').click(function() {
        $(this).find('i').toggleClass('ion-navicon-round ion-close-round');
        $('body').toggleClass('mobile-nav-active')
    })

    //Toggle Share
    $('#postShare').on("click", function() {
        $('#share').fadeToggle('fast');
    })

    $('#updateProject').on("click", function() {
        $('#updateProjectModal').fadeToggle('fast');
    })

    $('#editProject').on("click", function() {
        $('#editProjectModal').fadeToggle('fast');
    })

    $('.closemodal').on("click", function() {
        $('.share-modal').hide();
    })

    shareSocial = function() {
        $('#share-to-social').show();
        $('#share-tags').hide();
    };

    shareTags = function() {
        $('#share-to-social').hide();
        $('#share-tags').show();
    };

    $('#postShare, .toggleShare').on("click", shareSocial);
    $('.toggleTags').on("click", shareTags);

    //Fix footer if small screen
    if ($('.footer').length && $('.footer').offset().top < $(window).height()) {
        $('.footer').addClass('fixed');
    }

    // Dropdown Trigger
    $('.dropdown-trigger').click(function() {
        var dropdown = $(this).siblings('.dropdown');

        if (!dropdown.hasClass('active')) {
            dropdown.addClass('active');
            setTimeout(function() {
                triggerClose(dropdown)
            }, 10);
        }
    })

    function triggerClose(dropdown) {
        $(document).click(function(event) {
            if (!$(event.target).closest('.dropdown').length) {
                if (dropdown.hasClass("active")) {
                    dropdown.removeClass('active');
                    $(this).off('click');
                }
            }
        })
    }
});
