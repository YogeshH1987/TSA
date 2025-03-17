
$(document).ready(function() {
    // addedFavorite();
    architectsRecommended();
    architectsNearYou()
});

$(window).resize(function() {
    architectsRecommended();
    architectsNearYou()
});


function architectsRecommended() {
    var swiper = new Swiper(".js-architects-recommended", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: false,
        pagination:false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1,

            },
            // when window width is <= 999px
            999: {
                slidesPerView: 2,
            }
        }
    });
}

function architectsNearYou() {
    var swiper = new Swiper(".js-architects-near-you", {
        slidesPerView: 1.1,
        spaceBetween: 12,
        loop: false,
        navigation: false,
        pagination:false,
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1.1,
                spaceBetween: 12,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
}

var swiperInstances = {}; // Object to store Swiper instances

function recommendedServiceSlider() {
    var screenWidth = window.innerWidth;
    var sliders = document.querySelectorAll(".js-recommended-service");

    sliders.forEach((slider, index) => {
        var sliderKey = `swiper-${index}`; // Unique key for each slider

        if (screenWidth <= 999) { 
            if (!swiperInstances[sliderKey]) {
                swiperInstances[sliderKey] = new Swiper(slider, {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                    loop: false,
                    navigation: false,
                    pagination: false,

                    breakpoints: {
                        768: {
                            slidesPerView: 1.2,
                            spaceBetween: 12,
                        },
                        999: {
                            slidesPerView: 8,
                            spaceBetween: 20
                        }
                    }
                });
            }
        } else {
            // Destroy Swiper if it exists when screen width is larger than 999px
            if (swiperInstances[sliderKey]) {
                swiperInstances[sliderKey].destroy(true, true);
                delete swiperInstances[sliderKey];
            }
        }
    });
}

// Run on page load
recommendedServiceSlider();

// Run on window resize
window.addEventListener("resize", recommendedServiceSlider);