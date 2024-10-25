var winWidth = $(window).width();

$(document).ready(function() {    
    if ($(window).width() < 768) {
        $('.grid-sizer').show();
        homeBannerFeatureMobile();
    } else{
        $('.grid-sizer').hide();
        destroyIsotope();
    }

    if ($('.js-home-bg').length != 0) {
        bgHomeImg();
    };
});

$(window).resize(function() {
    if ($(window).width() < 768) {
        $('.grid-sizer').show();
        homeBannerFeatureMobile();
    } else{
        $('.grid-sizer').hide();
        destroyIsotope();
    }
    if ($('.js-home-bg').length != 0) {
        bgHomeImg();
    };
});

function homeBannerFeatureMobile() {
    var $grid = $('.feature').isotope({
        itemSelector: '.feature-item',
        // layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-sizer',  
            gutter: 6 
        }
    });
}

function destroyIsotope() {
    var $grid = $('.feature').data('isotope'); 
    if ($grid) {
        $grid.destroy(); // Destroy Isotope instance if present
    }
}

function bgHomeImg() {
    $('.js-home-bg').each(function() {
        var imgSrc = $(this).find('.bg-img').attr('src');
        if ($(window).width() < 768) {
            $(this).css({
                'background': '#F3F4F6',   
            });
        } 
        else{
            $(this).css({
                'background': '#F3F4F6 url(' + imgSrc + ')', 
                'background-position':' top right',
                'background-repeat': 'no-repeat',  
                'background-size': 'auto'       
            });
        }
    })
}