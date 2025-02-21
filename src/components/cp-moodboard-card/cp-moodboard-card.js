$(document).ready(function () {
    $('<div class="grid-sizer"></div>').appendTo('.colonial');
    homeBannerFeatureMobile();
});

$(window).resize(function () {
    homeBannerFeatureMobile();
});

function homeBannerFeatureMobile() {
    // Select all elements with the class 'colonial'
    const grids = document.querySelectorAll('.colonial');
    
    grids.forEach(grid => {
        new Isotope(grid, {
            itemSelector: '.colonial-item',
            layoutMode: 'masonry',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer',
                gutter: 0
            }
        });
    });
}
