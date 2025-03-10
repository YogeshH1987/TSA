$(document).ready(function () {
    // addedFavorite();
    shedTypeSlider();
    shedProductSlider()
});

$(window).resize(function () {
    shedTypeSlider();
    shedProductSlider()
});



function shedTypeSlider() {
    var swiper = new Swiper(".js-shed-type", {
        slidesPerView:1.3,
        spaceBetween: 20,
        loop: false,
        navigation:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1.3,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 1,
            }
        }

    });
}

function shedProductSlider() {
    var swiper = new Swiper(".js-shed-product", {
        slidesPerView:1.2,
        spaceBetween: 12,
        loop: false,
        navigation:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1.2,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 2.5,
            }
        }
    });
}