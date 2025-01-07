// $(".js-policies-scroll .list-item a[href^='#'], .typ-help-policies .tab-item a[href^='#']").on('click', function (e) {
//     // prevent default anchor click behavior
//     e.preventDefault();

//     // animate
//     $('html, body').animate({
//         scrollTop: $(this.hash).offset().top - 150
//     }, 300, function () {
//     });
// });

// Call the function on document ready
$(document).ready(function () {
    relatedArticals();
});

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
        mySwiper = new Swiper('.js-policies', {
            loop: true,
            slidesPerView: 2.2,
            spaceBetween: 12,
            centeredSlides: false,
            loop: false,
            pagination:false,
        });
    };

    breakpoint.addListener(breakpointChecker); // kickstart

    breakpointChecker();
}
