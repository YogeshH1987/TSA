
$(document).ready(function () {
  proThumbSlider();
  proPopUpThumbSlider();
  proPopupGalleryThumbSlider();
  proArchitechThumbSlider()
});


$(window).resize(function () {
  proThumbSlider();
  proPopUpThumbSlider();
  proPopupGalleryThumbSlider();
  proArchitechThumbSlider()
});

function proThumbSlider() {
  // Initialize the main slider with Swiper
  var thumbSlider = new Swiper(".js-thumb-slider", {
    slidesPerView: 4,
  });
  var mainSlider = new Swiper(".js-pro-slider", {
    thumbs: {
      swiper: thumbSlider,
    },
  });


}

function proPopUpThumbSlider() {
  // Initialize the main slider with Swiper
  var thumbSlider = new Swiper(".js-popup-thumb-slider", {
    slidesPerView: 4,
  });
  var mainSlider = new Swiper(".js-popup-pro-slider", {
    thumbs: {
      swiper: thumbSlider,
    },
  });


}


function proPopupGalleryThumbSlider() {
  // Initialize the main slider with Swiper
  var popgathumbSlider = new Swiper(".js-popup-thumb-gallery-slider", {
    slidesPerView: 8,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next-thumb',
      prevEl: '.swiper-button-prev-thumb'
    },
    freeMode: true,
  });
  var popgamainSlider = new Swiper(".js-popup-gallery-slider", {
    thumbs: {
      swiper: popgathumbSlider,
    },
    navigation:false,
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  });

}

function proArchitechThumbSlider() {
  // Initialize the main slider with Swiper
  var architechthumbSlider = new Swiper(".js-thumb-architech-slider", {
    slidesPerView: 6,
    spaceBetween: 10,
    freeMode: true,
    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 10
      },
      // when window width is >= 480px
      1024: {
        slidesPerView: 7,
        spaceBetween:10
      },
      // when window width is >= 640px
      1280: {
        slidesPerView: 7,
        spaceBetween: 10
      }
    }
  });
  var architechmainSlider = new Swiper(".js-pro-architech-slider", {
    thumbs: {
      swiper: architechthumbSlider,
      slidesPerView: 1,
      spaceBetween: 0,
    },
  });


}


 function proVerticalThumbSlider(){
  // Initialize the main slider with Swiper
  var thumbSlider = new Swiper(".js-vertical-thumb-slider", {
   slidesPerView: 5,
     direction: 'vertical',
    
 });
 var mainSlider = new Swiper(".js-vertical-pro-slider", {
   thumbs: {
     swiper: thumbSlider,
   },
 });

 
}



