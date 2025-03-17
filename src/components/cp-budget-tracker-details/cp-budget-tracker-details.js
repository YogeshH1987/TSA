function mobileTabFunction() {
    if ($(window).width() < 768) {
        $('.cp-tab').each(function () {
            const $tabContainer = $(this);
    
            $tabContainer.find('.tab-content').hide();
            $tabContainer.find('.tab-content.active').show();
    
            $tabContainer.find('.tab-item').off('click').on('click', function (e) {
                e.stopPropagation();
    
                $tabContainer.find('.tab-item').removeClass('active');
                $tabContainer.find('.tab-content').removeClass('active').fadeOut(200);
    
                const target = $(this).data('target');
                $(this).addClass('active');
                $tabContainer.find(target).addClass('active').fadeIn(200);
            });
        });
    } else {
        $('.cp-tab .tab-item').off('click'); // Disable tab functionality on desktop
        $('.cp-tab .tab-content').show(); // Ensure all tab contents are visible on desktop
    }
}

$(document).ready(function () {
    mobileTabFunction();
    $(window).resize(function () {
        mobileTabFunction();
    });
});
