window.onload = function() {
    var entranceScenes = [{
        play: function() {
            animate({
                el: $('#logo'),
                opacity: [0, 1],
                duration: 800,
                easing: "easeInBack"
            });

            animate({
                el: $('.entrance-scene__wrap'),
                opacity: [0, 1],
                translateY: ["100%", 0],
                duration: 1500,
                easing: "easeInOutCubic"
            });

            animateEntranceScenes();

            function animateEntranceScenes() {
                var step = 0;
                var from, to;

                var loop = setInterval(function() {
                    from = (step * -20) + "%";
                    to = ((step * -20) - 20) + "%";

                    animate({
                        el: $('.entrance-slider__content'),
                        translateY: [from, to],
                        duration: 1000,
                        easing: "easeInOutBack"
                    });

                    step++;

                    if (step == 5) {
                        window.clearInterval(loop);
                        entranceScenes[1].play();
                    }
                }, 2000);
            }
        }
    }, {
        play: function() {
            $('.entrance-scene__skip, .entrance-scene__divider').addClass('animated fadeOut longer');
            $("#logo")
                .addClass('logo--active')
                .animate({
                    left: "100px",
                }, 1500, "easeOutExpo", function() {
                    loadMainPage();
                });
        }
    }]


    if (isMobile.phone) {
        $('.loader').remove();
        $('.entrance-scene').remove();
        $('#intro, #navigation, .team, #recruitment, #main, .next-arrow').removeAttr("style");
        $('#logo').addClass('logo--mobile').css({ opacity: 1 });
        $('.header-navigation-open').click(function() {
            $('.navigation').addClass('navigation--visible');
        });
        $('.navigation-close').click(function() {
            $('.navigation').removeClass('navigation--visible');
        });
        // Smooth scroll
        $('.navigation__link').on('click', function(e) {
            e.preventDefault();
            $('.navigation').removeClass('navigation--visible');
            var id = $(this).attr('href');
            var pos = $(id).offset().top - 100;
            $('body, html').animate({ scrollTop: pos });
        });
    } else {
        $('.loader').remove();
        $('.entrance-scene').show();
        entranceScenes[0].play();
        $('#skip-entrance').click(function() {
            $("#logo").addClass('logo--active').animate({ opacity: 1, left: '100px' }, 1500, "easeOutExpo");
            loadMainPage();
        });
    }

    var iconPositionSet = false;

    function calculateSliderIconPosition() {
        if (iconPositionSet) return;

        iconPositionSet = true;
        var firstSlide = $('.service-slide').eq(0);
        var iconFromNav = firstSlide.offset().top - 105;
        var textFromNav = firstSlide.find('.service-slide__title').offset().top - 105;
        var idealPosition = (textFromNav / 2) - 50;
        var offset = idealPosition - iconFromNav - 20;
        $('.service-slide__icon').css({ top: offset + "px" });
    }

    var pageLoaded;

    function loadMainPage() {
        if (pageLoaded) return;

        $('.entrance-scene').remove();
        $('#main').show();

        setTimeout(function() {
            $(".navigation").show();
        }, 500);

        setTimeout(function() {
            pageEntranceAnimations.start();
        }, 1000);

        setupOnePageScroll();
        setupNavigation();
        pageLoaded = true;
    }

    var sections = ['about', 'services', 'servicesWeOffer', 'team', 'contact', 'apply', 'footer'];

    function setupOnePageScroll() {
        var currentIndex = 1;

        $('body, html').addClass('has-onepage');
        $("#main").onepage_scroll({
            responsiveFallback: 767,
            pagination: false,
            loop: false,
            beforeMove: function(index) {
                var section = sections[index - 1];
                var direction = index > currentIndex ? "down" : "up";
                pageExitAnimations[section](direction);
                updateNavigation(index);
            },
            afterMove: function(index) {
                currentIndex = index;
                var section = sections[index - 1];
                pageEntranceAnimations[section]();
            }
        });
    }

    function setupNavigation() {
        // Navigation click
        $('.navigation__link').click(function(e) {
            e.preventDefault();
            var index = $(this).data('section');
            $("#main").moveTo(index);
        })
    }

    function updateNavigation(index) {
        var navLink = $('.navigation__link[data-section="' + (index == 3 ? 2 : index) + '"]');
        if (navLink) {
            $('.navigation__link').removeClass('navigation__link--active');
            navLink.addClass('navigation__link--active');
        }

        // Move pagination scrubber
        var scrubber_distance = (index - (index > 3 ? 3 : 2)) * 14;
        $('.pagination__scrubber').css('transform', 'translateY(' + scrubber_distance + 'px)');
    }

    var pageEntranceAnimations = (function() {
        return {
            start: function() {
                $('#intro').show();
                $('#about').find('.section-label').show();
                setTimeout(function() {
                    $('.next-arrow').show();
                }, 1500);
            },
            about: function() {},
            services: function() {
                function setActive(index) {
                    $('.service-slider__count span').text(index + 1);
                    $('.service-slide').removeClass('service-slide--active');
                    $('.service-slide').eq(index).addClass('service-slide--active');
                    $('.service-slider__control').removeClass('service-slider__control--active');
                    $('.service-slider__control').eq(index).addClass('service-slider__control--active');
                }

                setActive(0);
                calculateSliderIconPosition();
                $('.service-slider__control').unbind('click');
                $('.service-slider__control').unbind('mouseover');

                $('.service-slider__control').click(function() {
                    setActive($(this).index());
                });
                $('.service-slider__control').on('mouseover', function() {
                    setActive($(this).index());
                });
            },
            servicesWeOffer: function() {
                $('#services-message').show();
            },
            team: function() {
                $('.team').show();
            },
            contact: function() {},
            apply: function() {
                $('#recruitment').show();
            },
            footer: function() {},
        }
    })();

    var pageExitAnimations = (function() {
        return {
            start: function() {},
            about: function(direction) {
                $('#header').attr('class', 'header');
                $('#pagination').attr('class', 'hidden');
            },
            services: function(direction) {
                $('#header').attr('class', 'header');
                $('#pagination').attr('class', 'pagination');
            },
            servicesWeOffer: function(direction) {
                if (direction == 'up') $('#header').addClass('header--remove-delay');
                $('#header').removeClass('header--green').addClass('header--blue');
                $('#pagination').addClass('pagination--white');
            },
            team: function(direction) {
                $('#header').attr('class', 'header');
                $('#pagination').attr('class', 'pagination');
            },
            contact: function(direction) {
                if (direction == 'up') $('#header').addClass('header--remove-delay');
                $('#header').removeClass('header--blue').addClass('header--green');
                $('#pagination').addClass('pagination--white');
            },
            apply: function(direction) {
                $('#header').attr('class', 'header');
                $('#pagination').attr('class', 'pagination');
            },
            footer: function(direction) {
                if (direction == 'up') $('#header').addClass('header--remove-delay');
                $('#header').removeClass('header--green').addClass('header--blue');
                $('#pagination').addClass('pagination--white');
            }
        }
    })();
};
