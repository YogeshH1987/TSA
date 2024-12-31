var winWidth = $(window).width();

$(document).ready(function () { 
  prodictSlickSlider();
  
  addedFavorite();
  if ($(window).width() < 769) {
    bestSellingSlider();
    reviewProductSlider();
    vegetablePatchSlider();
  }
  initializeInnerSliders();
  if ($(window).width() > 769) {
    internalProductSlider();
  }
});

$(window).resize(function () {    
  if ($(window).width() < 769) {
    bestSellingSlider();
    reviewProductSlider();
    vegetablePatchSlider();
  }
  if ($(window).width() > 769) {
    internalProductSlider();
  }
});

function addedFavorite() {
  $('.cp-toast').hide();

  $(document).on('click', '.js-add-favorite', function() {
      const $icon = $(this);
      const isActive = $icon.toggleClass('active icon-heart-fill').hasClass('active');
      $icon.toggleClass('icon-unfill-like', !isActive);
      const toastMessage = isActive ? 'Added to Favorite' : 'Removed from Favorite';
      $('.cp-toast').toggleClass('typ-error', !isActive);
      $('.cp-toast').text(toastMessage).show().delay(3000).fadeOut();
  }); 
}

function bestSellingSlider() {
  var swiper = new Swiper(".js-selling-product", {
    slidesPerView: "auto",
    loop: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

function reviewProductSlider() {
  var swiper = new Swiper(".js-review-product", {
    slidesPerView: "auto",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

function initializeInnerSliders() {
  const innerCardSlider = new Swiper('.js-inner-card-slider', { 
    pagination: {
      el: ('.child-pagination'), 
      clickable: true,
    },
    slidesPerView: 1,
  });
}

function vegetablePatchSlider() {
  // Initialize the outer swiper
  var outerSwiper = new Swiper('.js-vegetable-patch', {
    slidesPerView: 'auto',
    pagination: {
      el: '.main-pagination',
      type: 'custom',  // Use custom pagination
      renderCustom: function (outerSwiper, current, total) {
        return current + ' of ' + total;  // Custom format "1 of 5"
      }
    },
  });
}
function internalProductSlider() {
  const innerCardSlider = new Swiper('.js-product-inner-slider', { 
    pagination: {
      el: ('.child-pagination'), 
      clickable: true,
    },
    slidesPerView: 1,
  });
}

function vegetablePatchSlider() {
  // Initialize the outer swiper
  var outerSwiper = new Swiper('.js-similar-product', {
    slidesPerView: 'auto',
    pagination: 'false',
  });
}

function prodictSlickSlider() {
  // Check if the window width is less than 769px (mobile)
  if ($(window).width() < 769) {
    // Initialize Slick slider if not already initialized
    if (!$('.js-product-need-slider').hasClass('slick-initialized')) {
      $('.js-product-need-slider').slick({
        infinite: true,
        slidesToShow: 1.1,    // Show 1 slide at a time
        slidesToScroll: 1,   // Scroll 1 slide at a time
        dots: true,          // Enable pagination dots
        arrows: false,       // Disable next/prev arrows
        autoplay: false,      // Enable autoplay
        autoplaySpeed: 2000,
        variableWidth: true 
      });
    }
  } else {
    // Destroy Slick slider on devices larger than 768px
    if ($('.js-product-need-slider').hasClass('slick-initialized')) {
      $('.js-product-need-slider').slick('unslick');
    }
  }
}