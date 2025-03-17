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

var swiperInstance; // Global variable to store Swiper instance

function categoryMaterialSlider() {
    var screenWidth = window.innerWidth;

    if (screenWidth <= 999) { 
        // Initialize Swiper only if it's not already initialized
        if (!swiperInstance) {
            swiperInstance = new Swiper(".js-category-material", {
                slidesPerView: 2.8,
                spaceBetween: 12,
                loop: false,
                navigation: false,
                pagination: false,

                breakpoints: {
                    768: {
                        slidesPerView: 2.8,
                        spaceBetween: 12,
                    },
                    999: {
                        slidesPerView: 8,
                        spaceBetween: 20
                    }
                }
            });
        }
    } else {
        // Destroy Swiper if it exists when screen width is larger than 999px
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    }
}

// Run on page load
categoryMaterialSlider();

// Run on window resize
window.addEventListener('resize', categoryMaterialSlider);