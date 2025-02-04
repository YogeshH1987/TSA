
$(document).ready(function() {
    // addedFavorite();
    architectsRecommended();
    architectsNearYou()
});

$(window).resize(function() {
    architectsRecommended();
    architectsNearYou()
});


function architectsRecommended() {
    var swiper = new Swiper(".js-architects-recommended", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: false,
        pagination:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1,

            },
            // when window width is <= 999px
            999: {
                slidesPerView: 2,
            }
        }
    });
}

function architectsNearYou() {
    var swiper = new Swiper(".js-architects-near-you", {
        slidesPerView: 1.1,
        spaceBetween: 12,
        loop: false,
        navigation: false,
        pagination:false,
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1.1,
                spaceBetween: 12,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
}