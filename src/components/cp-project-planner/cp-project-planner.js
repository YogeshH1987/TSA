$(document).ready(function() {
    // addedFavorite();
    projectPlannerSlider();
});

$(window).resize(function() {
    projectPlannerSlider();
});


function projectPlannerSlider() {
    var swiper = new Swiper(".js-project-planner", {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
  
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1,
                spaceBetweenSlides: 0,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 4,
                spaceBetweenSlides: 32,
            }
        }
    });
}