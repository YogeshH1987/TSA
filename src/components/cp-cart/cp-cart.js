
var winWidth = $(window).width();

$(document).ready(function() {
    // addedFavorite();
    bankOffers();
});

$(window).resize(function() {
    bankOffers();
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