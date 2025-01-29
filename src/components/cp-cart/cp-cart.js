
var winWidth = $(window).width();

$(document).ready(function() {
    // addedFavorite();
    bankOffers();
    orderConfirmationSlider();
});

$(window).resize(function() {
    bankOffers();
    orderConfirmationSlider();
});
function bankOffers(){
    var swiper = new Swiper(".js-bank-offer", {
        slidesPerView: 1,
        loop: false,
        navigation: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
    }); 
}

function orderConfirmationSlider() {
    var swiper = new Swiper(".js-order-confirmation", {
        slidesPerView: 1.1,
        spaceBetween: 16,
        loop: false,
        pagination:false,
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1.1,
                spaceBetweenSlides: 16,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 2,
                spaceBetweenSlides: 16,
            }
        }
    });
}