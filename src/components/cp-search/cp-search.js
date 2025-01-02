$(document).ready(function () { 
    searchKeyword();
});

function searchKeyword() {
    const $searchInput = $('.search-input');
    const $searchWrap = $('.search-wrap');
    const $resultWrap = $('.search-reasult-wrap');
    const $overlay = $('.cm-overlay');
    const $close = $('.js-close');
  
    // When typing in the search input
    $searchInput.on('input', function () {
        const winWidth = $(window).width(); // Get current window width

        if ($.trim($(this).val()) !== '') {
            $resultWrap.addClass('open');
            $searchWrap.addClass('active'); // Add the active class to search-wrap
            
            if (winWidth <= 768) {
                $overlay.show(); // Show the overlay only for mobile devices
            }
        } else {
            $resultWrap.removeClass('open');
            $searchWrap.removeClass('active'); // Remove the active class from search-wrap
            $overlay.hide(); // Hide the overlay
        }
    });
  
    // When clicking on the overlay
    $overlay.on('click', function () {
        $resultWrap.removeClass('open');
        $searchWrap.removeClass('active'); // Remove the active class from search-wrap
        $searchInput.val(''); // Clear the input
        $(this).hide(); // Hide the overlay
    });

    $close.on('click', function () {
        $resultWrap.removeClass('open');
        $searchWrap.removeClass('active'); // Remove the active class from search-wrap
        $searchInput.val(''); // Clear the input
        $(this).hide(); // Hide the overlay
    });

    // Handle window resize to ensure consistent behavior
    $(window).on('resize', function () {
        const winWidth = $(window).width();
        if (winWidth > 768) {
            $overlay.hide(); // Ensure overlay is hidden on desktop resize
        }
    });
}
