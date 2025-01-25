var winWidth = $(window).width();

$(document).ready(function() {
    // addedFavorite();
    blogSlider();
    blogNavSlider();
    whyPraveshSlider();
});

$(window).resize(function() {
    blogNavSlider();
    blogSlider();
});

// function addedFavorite() {
//     $('.cp-toast').hide();

//     $(document).on('click', '.js-add-favorite', function() {
//         const $icon = $(this);
//         const isActive = $icon.toggleClass('active icon-heart-fill').hasClass('active');
//         $icon.toggleClass('icon-unfill-like', !isActive);
//         const toastMessage = isActive ? 'Added to Favorite' : 'Removed from Favorite';
//         $('.cp-toast').toggleClass('typ-error', !isActive);
//         $('.cp-toast').text(toastMessage).show().delay(3000).fadeOut();
//     }); 
// }

function blogSlider() {
    var swiper = new Swiper(".js-blog", {
        slidesPerView: 'auto',
        loop: false,
        navigation: false
    });
}
function blogNavSlider() {
    var swiper = new Swiper(".js-blog-nav", {
        slidesPerView: 'auto',
        loop: false,
        navigation: {
            nextEl: ".swiper-button-next.blog-next",
            prevEl: ".swiper-button-prev.blog-prev",
        },
    });
}

function whyPraveshSlider(){
    var swiper = new Swiper(".js-why-pravesh", {
        slidesPerView: 'auto',
        loop: false,
        navigation: false
    }); 
}