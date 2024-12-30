var winWidth = $(window).width();

$(document).ready(function() {
    // addedFavorite();
    blogSlider()
    whyPraveshSlider()
    whyPraveshDrawerSlider()
});

$(window).resize(function() {
    blogSlider()
    whyPraveshSlider()
    whyPraveshDrawerSlider()
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

function whyPraveshSlider(){
    var swiper = new Swiper(".js-why-pravesh", {
        slidesPerView: 2.5,
        loop: false,
        navigation: false,
        spaceBetween: 20,
    }); 
}
function whyPraveshDrawerSlider(){
    var swiper = new Swiper(".js-why-pravesh-drawer", {
        slidesPerView: 2.2,
        loop: false,
        navigation: false,
        spaceBetween: 10,
    }); 
}