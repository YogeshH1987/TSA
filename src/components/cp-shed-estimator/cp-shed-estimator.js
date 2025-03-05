$(document).ready(function () {
    // addedFavorite();
    shedTypeSlider();
});

$(window).resize(function () {
    shedTypeSlider();
});



function shedTypeSlider() {
    var swiper = new Swiper(".js-roof-img", {
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