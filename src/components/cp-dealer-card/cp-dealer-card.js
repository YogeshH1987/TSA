
var winWidth = $(window).width();

$(document).ready(function () { 
    dealerSlider();  
    aboutNews() 
});

$(window).resize(function () {
  if ($(window).width() < 769) {
    dealerSlider();
    aboutNews() 
  }
});

function dealerSlider() {
  var swiper = new Swiper(".js-dealerSlider", {
    slidesPerView: "auto",
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function aboutNews() {
  'use strict'; // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout

  var breakpoint = window.matchMedia('(min-width:768px)'); // keep track of swiper instances to destroy later

  var mySwiper;
  var breakpointChecker = function breakpointChecker() {
      // if larger viewport and multi-row layout needed
      if (breakpoint.matches === true) {
          // clean up old instances and inline styles when available
          if (mySwiper !== undefined) mySwiper.destroy(true, true); // or/and do nothing

          return; // else if a small viewport and single column layout needed
      } else if (breakpoint.matches === false) {
          // fire small viewport version of swiper
          return enableSwiper();
      }
  };

  var enableSwiper = function enableSwiper() {
      mySwiper = new Swiper('.js-about-news', {
          loop: true,
          slidesPerView: 1.1,
          spaceBetween: 12,
          centeredSlides: false,
          loop: false,
          pagination: false
      });
  };

  breakpoint.addListener(breakpointChecker); // kickstart

  breakpointChecker();
}








