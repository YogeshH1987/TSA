$(document).ready(function () { 
  productTypeSlider();  
  productMaterialSlider()
});


function productTypeSlider() {
    var swiper = new Swiper(".js-prod-types", {
        slidesPerView: "auto",
        loop: false,
        navigator: false
    });
}


function productMaterialSlider() {
  var swiper = new Swiper(".js-product-material", {
      slidesPerView: 3.2,
      spaceBetween: 12,
      loop: false,
      navigation:false,
      pagination:false,

      breakpoints: {
          // when window width is <= 499px
          768: {
              slidesPerView: 3.2,
              spaceBetweenSlides: 12,
          },
          // when window width is <= 999px
          999: {
              slidesPerView: 8,
              spaceBetweenSlides: 20
          }
      }
  });
}