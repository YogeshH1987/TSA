var winWidth = $(window).width();

$(document).ready(function() {
    homeStyleSlider();
    architechStyleSlider();
    exporebystyle()
});

$(window).resize(function() {
    homeStyleSlider();
    architechStyleSlider();
    exporebystyle()
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

function exporebystyle() {
  var swiper = new Swiper(".js-explore-style", {
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
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
  });
}
// roated image description page
$(document).ready(function(){
  // Event listener for rotating images
  $('[id^=js-roated-btn]').on('click', function(){
    // Get the target image's ID from the button's data-target attribute
    var targetImageId = $(this).data('target');
    
    // Get the current angle and increment it by 90 degrees, defaulting to 90 if not set
    var angle = ($(targetImageId).data('angle') + 90) || 90;
    
    // Apply the rotation to the image element
    $(targetImageId).css({'transform': 'rotate(' + angle + 'deg)'});
    
    // Store the updated angle in the image's data attribute
    $(targetImageId).data('angle', angle);
  });
});
