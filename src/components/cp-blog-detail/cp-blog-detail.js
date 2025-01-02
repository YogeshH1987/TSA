function relatedArticals() {
    'use strict'; // breakpoint where swiper will be destroyed
    // and switches to a dual-column layout

    var breakpoint = window.matchMedia('(min-width:768px)'); // keep track of swiper instances to destroy later

    var mySwiper;
    var breakpointChecker = function breakpointChecker() {
        // if larger viewport and multi-row layout needed
        if (breakpoint.matches === true) {
            // clean up old instances and inline styles when available
            if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

            return; // else if a small viewport and single column layout needed
        } else if (breakpoint.matches === false) {
            // fire small viewport version of swiper
            return enableSwiper();
        }
    };

    var enableSwiper = function enableSwiper() {
        mySwiper = new Swiper('.js-related-articals', {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 12,
            centeredSlides: false,
            loop: false,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    };

    breakpoint.addListener(breakpointChecker); // kickstart

    breakpointChecker();
}

// Call the function on document ready
$(document).ready(function () {
    relatedArticals();
});


//Scroll event
$(window).scroll(function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 200) $('#BackToTop').fadeIn('slow');
    if (scrolled < 200) $('#BackToTop').fadeOut('slow');
});

//Click event
$('#BackToTop').click(function () {
    $("html, body").animate({ scrollTop: "0" }, 500);
});




