var winWidth = $(window).width();

$(document).ready(function() {
    videoCardSlider();
});

$(window).resize(function() {
    videoCardSlider();
});

function videoCardSlider() {
    var swiper = new Swiper(".js-video-card", {
        loop: false,
        navigation: false,
        breakpoints: {
            // when window width is >= 320px
            768: {
              slidesPerView: 1,
              spaceBetween: 12
            },
            // when window width is >= 480px
            1024: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 640px
            1280: {
              slidesPerView: 2,
              spaceBetween: 20
            }
          }
    });
}