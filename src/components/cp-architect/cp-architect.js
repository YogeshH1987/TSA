var winWidth = $(window).width();

$(document).ready(function () { 
  architectSlider();
  architechProject();
  experts()
});

$(window).resize(function () {
  if ($(window).width() < 769) {
    architectSlider();
    architechProject();
    experts()
  }
});

function architectSlider() {
  var swiper = new Swiper(".js-architect", {
    slidesPerView: "auto",
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function fabricatorsSlider() {
  var swiper = new Swiper(".js-fabricators", {
    slidesPerView: "auto",
    loop: false,
  });
}


function architechProject() {
  var swiper = new Swiper(".js-architech-project", {
      slidesPerView: 1.2,
      spaceBetween: 12,
      loop: false,
      navigation: false,
      pagination:false,
      breakpoints: {
          // when window width is <= 499px
          768: {
              slidesPerView: 1.2,
              spaceBetween: 12,
          },
          // when window width is <= 999px
          999: {
              slidesPerView: 4,
              spaceBetween: 20,
          }
      }
  });
}

function experts() {
  var swiper = new Swiper(".js-experts", {
      slidesPerView: 1.7,
      spaceBetween: 12,
      loop: false,
      navigation: false,
      pagination:false,
      breakpoints: {
          // when window width is <= 499px
          768: {
              slidesPerView: 1.7,
              spaceBetween: 12,
          },
          // when window width is <= 999px
          999: {
              slidesPerView: 6,
              spaceBetween: 20,
          }
      }
  });
}

