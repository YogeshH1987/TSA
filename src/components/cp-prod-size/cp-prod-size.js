
$(document).ready(function () {
    productSelectSlider() ;
    packageSelectSlider();
    embossSelectSlider()
});

$(window).resize(function () {
    productSelectSlider() ;
    packageSelectSlider();
    embossSelectSlider()
});


function productSelectSlider() {
    swiper = new Swiper(".js-product-select", {
        slidesPerView: 5,
        spaceBetween: 18,
        loop: false,
        autoplay:false,
        navigation: {
            nextEl: ".swiper-button-next.feature-next",
            prevEl: ".swiper-button-prev.feature-prev",
        },
        // Responsive breakpoints
    //     breakpoints: {
            
    //         640: {
    //           slidesPerView: 3,
    //         },
    //         320: {
    //           slidesPerView: 3,
    //         }
    //   }
    });

}

function embossSelectSlider() {
    swiper = new Swiper(".js-emboss-select", {
        slidesPerView: 5,
        spaceBetween: 18,
        loop: false,
        autoplay:false,
        navigation: {
            nextEl: ".swiper-button-next.feature-next",
            prevEl: ".swiper-button-prev.feature-prev",
        },
    //     breakpoints: {
            
    //         640: {
    //           slidesPerView: 3,
    //         },
    //         320: {
    //           slidesPerView: 3,
    //         }
    //   }
    });

}
function packageSelectSlider() {
    swiper = new Swiper(".js-package-select", {
        slidesPerView: 3,
        spaceBetween: 18,
        loop: false,
        autoplay:false,
        navigation: {
            nextEl: ".swiper-button-next.feature-next",
            prevEl: ".swiper-button-prev.feature-prev",
        },
        // Responsive breakpoints
    //     breakpoints: {
            
    //         640: {
    //           slidesPerView: 2,
    //         },
    //         320: {
    //           slidesPerView: 2,
    //         }
    //   }
    });

}