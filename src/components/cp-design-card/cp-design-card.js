var winWidth = $(window).width();

$(document).ready(function() {
    homeStyleSlider();
    architechStyleSlider()
});

$(window).resize(function() {
    homeStyleSlider();
    architechStyleSlider()
});

function homeStyleSlider() {
    var swiper = new Swiper(".js-home-style", {
        slidesPerView: 'auto',
        loop: false,
        navigation: false
    });
}

function architechStyleSlider() {
    var swiper = new Swiper(".js-architech-style", {
        loop: false,
        slidesPerView: 1.2,
        spaceBetween: 12,
        navigation: false,
        breakpoints: {
            // when window width is >= 320px
            768: {
              slidesPerView: 1.2,
              spaceBetween: 12
            },
            992: {
              slidesPerView: 1.2,
              spaceBetween: 12
            },
            // when window width is >= 480px
            1024: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            // when window width is >= 640px
            1280: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }
    });
}