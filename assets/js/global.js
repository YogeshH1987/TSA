var winWidth = $(window).width();
var winHeight = $(window).height();

$(document).ready(function() {
    console.log('jQuery is working!');

    $('.model-open').on('click', function () {
        console.log('Modal open clicked!');
    });
    tabFunction();
    commonPopup();
    if ($('.js-bg').length != 0) {
        bgImg();
    };
});


$(window).resize(function(e) {
    winWidth = $(window).width();
    winHeight = $(window).height();
});

$(window).on('load', function(event) {
    // $('#loaderWrapper').hide();
});

$(window).on('scroll', function(event) {
});

function tabFunction() {
    // Hide all tab contents except the active one
    $('.tab-content').hide();
    $('.tab-content.active').show();

    // Tab click handler
    $('.tab-item').click(function() {
        // Remove 'active' class from all tab items and contents
        $('.tab-item').removeClass('active');
        $('.tab-content').removeClass('active').fadeOut(200);

        // Add 'active' class to clicked tab and show corresponding content
        const target = $(this).data('target');
        $(this).addClass('active');
        $(target).addClass('active').fadeIn(200);
    });    
}

function bgImg() {
    $('.js-bg').each(function() {
        var imgSrc = $(this).find('.bg-img img').attr('src');
        $(this).css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        });
    })
}


// modalPopup js start
function commonPopup() {
    // Open modal
   
    $('.model-open').on('click', function (e) {
        e.preventDefault();
        const modalId = $(this).data('modal-id');
        console.log('Modal ID:', modalId);
        $(modalId).addClass('modal-show');
        $('.cm-overlay').addClass('active');
    });

    // Close modal
    $('.js-close, .cm-overlay').on('click',function() {
        console.log('Close clicked');
        $('.bs-modal').removeClass('modal-show');
        $('.cm-overlay').removeClass('active');
    });
}


// modalPopup js end


