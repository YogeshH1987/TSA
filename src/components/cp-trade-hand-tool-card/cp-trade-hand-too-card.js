var winWidth = $(window).width();
var swiper;

$(document).ready(function () { 
  tradeHandSlider();  
  architechDesignSlider()
});

$(window).resize(function () {
  tradeHandSlider();
  architechDesignSlider()
});

function tradeHandSlider() {
  if (winWidth < 769) {
    // Initialize Swiper only if it hasn't been initialized
    swiper = new Swiper(".js-tradeHandSlider", {
      slidesPerView: "auto",
      loop: true,
    });
  } else {
    // Destroy Swiper if it exists and reset the variable
    if (swiper) {
      swiper.destroy(true, true);
      swiper = undefined;
    }
  }
}

function architechDesignSlider() {
  // Initialize the main slider with Swiper
  swiper = new Swiper(".js-architect-design", {
    slidesPerView: 3.2,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 3.2,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 3.2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      1024: {
        slidesPerView: 6,
        spaceBetween:20
      },
      // when window width is >= 640px
      1280: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });



}