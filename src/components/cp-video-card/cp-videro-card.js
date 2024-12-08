(function () {
  let swiper; // Scoped to this function

  $(document).ready(function () { 
      realStoriesSlider();  
  });

  $(window).resize(function () {
    realStoriesSlider();
  });

  function realStoriesSlider() {
    if ($(window).width() < 768) {
      if (!swiper) {
        swiper = new Swiper(".js-real-stories", {
          slidesPerView: "auto",
          loop: true,
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = undefined;
      }
    }
  }
})();
