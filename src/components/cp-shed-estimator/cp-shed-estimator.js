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
        slidesPerView:1,
        spaceBetween: 20,
        loop: false,
        navigation:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });
}

function shedProductSlider() {
    var swiper = new Swiper(".js-shed-product", {
        slidesPerView:2.5,
        spaceBetween: 12,
        loop: false,
        navigation:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });
}