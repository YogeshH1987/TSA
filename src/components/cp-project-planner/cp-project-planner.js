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

document.addEventListener("DOMContentLoaded", function () {
    const closeIcon = document.querySelector(".stage-steps-wrap .icon");
    const stageStepsWrap = document.querySelector(".stage-steps-wrap");

    if (closeIcon && stageStepsWrap) {
        closeIcon.addEventListener("click", function () {
            stageStepsWrap.style.display = "none";
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.querySelector(".total-spent .link");
    const detailWrap = document.querySelector(".detail-wrap");

    toggleLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page jump

        if (detailWrap.style.display === "none") {
            detailWrap.style.display = "block";
            toggleLink.textContent = "Less details";
        } else {
            detailWrap.style.display = "none";
            toggleLink.textContent = "More details";
        }
    });
});
