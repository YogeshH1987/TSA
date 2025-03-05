$(document).ready(function () {
    // addedFavorite();
    shedTypeSlider();
});

$(window).resize(function () {
    shedTypeSlider();
});



function shedTypeSlider() {
    var swiper = new Swiper(".js-shed-type", {
        slidesPerView: 1.2,
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
                slidesPerView: 1.2,
                spaceBetweenSlides: 0,
                navigation: false,
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


document.addEventListener("DOMContentLoaded", function () {
    const quizItems = document.querySelectorAll(".cp-shed-type");

    quizItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove "selected" class from all items
            quizItems.forEach(q => q.classList.remove("selected"));

            // Hide "selected-text" for all items
            quizItems.forEach(q => {
                const selectedText = q.querySelector(".selected-text");
                if (selectedText) selectedText.style.display = "none";
            });

            // Add "selected" class to the clicked item
            this.classList.add("selected");

            // Show "selected-text" for the clicked item
            const selectedText = this.querySelector(".selected-text");
            if (selectedText) selectedText.style.display = "flex";
        });
    });
});