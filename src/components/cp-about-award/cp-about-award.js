$(document).ready(function() {
    // addedFavorite();
    achievementsSlider();
});

$(window).resize(function() {
    achievementsSlider();
});


function achievementsSlider() {
    var swiper = new Swiper(".js-impact-achievements", {
        // slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next.feature-next",
            prevEl: ".swiper-button-prev.feature-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
  
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1,
                spaceBetweenSlides: 0,
                navigation:false,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 3,
                spaceBetweenSlides: 20,
                pagination: false,
            }
        }
    });
}