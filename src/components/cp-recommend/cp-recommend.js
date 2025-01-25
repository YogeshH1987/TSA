$(document).ready(function() {
    // addedFavorite();
    architectsRecommended();
});

$(window).resize(function() {
    architectsRecommended();
});


function architectsRecommended() {
    var swiper = new Swiper(".js-architects-recommended", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: false,
        pagination:false,
  
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