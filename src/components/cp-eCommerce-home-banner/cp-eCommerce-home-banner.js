let swiper;

$(document).ready(function () {
    handleResponsiveFeatures();
    category()
});

$(window).resize(function () {
    handleResponsiveFeatures();
});

function handleResponsiveFeatures() {
    const currentWidth = $(window).width();

    if (currentWidth < 768) {
        destroySwiper();
        if (!$('.grid-sizer').length) {
            $('<div class="grid-sizer"></div>').appendTo('.feature');
        }
        bannerFeatureMobile();
    } else {
        $('.grid-sizer').remove();
        destroyIsotope();
        bannerFeatureDesktop();
    }
}

function bannerFeatureMobile() {
    const grid = document.querySelector('.feature');
    const iso = new Isotope(grid, {
        itemSelector: '.feature-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: 12,
        },
    });
}

function destroyIsotope() {
    const $grid = $('.feature').data('isotope');
    if ($grid) {
        $grid.destroy();
    }
}

function bannerFeatureDesktop() {
    if (!swiper) {
        swiper = new Swiper(".js-feature-banner", {
            slidesPerView: 6,
            spaceBetween: 20,
            loop: false,
            navigation: {
                nextEl: ".swiper-button-next.feature-next",
                prevEl: ".swiper-button-prev.feature-prev",
            },
        });
    }
}

function category() {
    swiper = new Swiper(".js-category", {
        slidesPerView: 6,
        spaceBetween: 20,
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next.feature-next",
            prevEl: ".swiper-button-prev.feature-prev",
        },
        // Responsive breakpoints
        breakpoints: {
            1920: {
                slidesPerView: 6,
            },
            1028: {
                slidesPerView: 6,
            },
            375: {
                slidesPerView: 2.3,
            }
        }
    });

}

function destroySwiper() {
    if (swiper) {
        swiper.destroy(true, true);
        swiper = undefined;
    }
}
