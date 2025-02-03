var winWidth = $(window).width();
var swiper;

$(document).ready(function () { 
  tradeHandSlider();  
});

$(window).resize(function () {
  tradeHandSlider();
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
