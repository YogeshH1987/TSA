$(document).ready(function() {
    // addedFavorite();
    timelineSlider();
});

$(window).resize(function() {
    timelineSlider();
});


function timelineSlider() {
    var swiper = new Swiper(".js-about-timeline", {
        slidesPerView:2,  // Default value for desktop
        spaceBetween: 0,
        loop: false,
        navigation: false,
        pagination: false,
        breakpoints: {
            // For screens less than 768px (Mobile view)
            1200: {
                slidesPerView: 5,  // Set to 2 slides on mobile
            }
        }
    });

    // Get window width
    var windowWidth = window.innerWidth;

    // Check if it's a desktop (screen width greater than or equal to 768px)
    if (windowWidth >= 768) {
        // Get all slides only for desktop
        var slides = document.querySelectorAll('.js-about-timeline .swiper-slide');
        
        // Check the number of slides
        var slideCount = slides.length;

        // If there are fewer than 5 slides, set slidesPerView to auto
        if (slideCount < 5) {
            swiper.params.slidesPerView = 'auto';  // Set to auto if there are fewer than 5 slides
            swiper.update();  // Refresh the swiper instance
        }

        // Adjust flex-grow and flex-basis for desktop
        if (slideCount < 5) {
            slides.forEach(slide => {
                slide.style.flexGrow = '0';  // Remove flex-grow (set to 0)
                slide.style.flexBasis = 'initial';  // Set flex-basis to initial
            });
        } else {
            slides.forEach(slide => {
                slide.style.flexGrow = '';  // Reset flex-grow to default
                slide.style.flexBasis = '';  // Reset flex-basis to default
            });
        }
    }
}

