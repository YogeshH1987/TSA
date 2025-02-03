var winWidth = $(window).width();

$(document).ready(function () {  
  addedFavoritePLP();
  toggleLayout();
  plpSlider(); 
});

$(window).resize(function () {    
});

function addedFavoritePLP() {
  $('.cp-toast').hide();

  $(document).on('click', '.js-plp-favorite', function() {
      // const $this = $(this);
      const $icon = $(this).find('.icon');
      const isActive = $(this).toggleClass('active').find('.icon').toggleClass('icon-heart-fill').hasClass('active');
      $icon.toggleClass('icon-unfill-like', !isActive);
      const toastMessage = isActive ? 'Added to Favorite' : 'Removed from Favorite';
      $('.cp-toast').toggleClass('typ-error', !isActive);
      $('.cp-toast').text(toastMessage).show().delay(3000).fadeOut();
  }); 
}

function toggleLayout() {
  $(document).on('click', '.lyt-list .lyt-item', function() {
    const viewType = $(this).data('type');
    
    // Toggle classes on .lyt-plp and update active state on icons
    $('.lyt-plp')
      .toggleClass('typ-list', viewType === 'list')
      .toggleClass('typ-grid', viewType === 'grid');
    $(this).addClass('active').siblings().removeClass('active');

    // Update the class of .cp-product-card based on view type
    $('.cp-product-card')
      .toggleClass('typ-list-view', viewType === 'list')
      .toggleClass('typ-grid-view', viewType === 'grid');

    // Call the slider function to manage Swiper instance based on view type
    plpSlider();
  });
}

// Function to initialize or destroy Swiper based on the layout
function plpSlider() {
  var innerCardSlider;

  if (currentWidth < 768) {
    innerCardSlider = new Swiper('.js-plp-slider', {
      pagination: {
        el: '.child-pagination',
        clickable: true,
      },
      slidesPerView: 1,
    }); 
  } else{
    destroySwiper();
  }
}

function destroySwiper() {
  if (innerCardSlider) {
    innerCardSlider.destroy(true, true);
    innerCardSlider = undefined;
  }
}
