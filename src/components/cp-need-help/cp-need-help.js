$(document).ready(function () {
    let scrollTimeout;

    const $helpBtn = $('.typ-btn-help');
    const $closeBtn = $('.btn.icon-close');
    const $modal = $('.need-help-modal');
    const $overlay = $('.cm-overlay');

    function openModal() {
        $modal.addClass('active');
        $overlay.addClass('active');
        $helpBtn.hide();
        $closeBtn.show();
    }

    function closeModal() {
        $modal.removeClass('active');
        $overlay.removeClass('active');
        $helpBtn.show();
        $closeBtn.hide();
    }

    $helpBtn.on('click', openModal);
    $closeBtn.on('click', closeModal);
    $overlay.on('click', closeModal);

    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        console.log("scrolling...", scrollTop);

        // Add small-btn immediately while scrolling
        $helpBtn.addClass('small-btn');

        // Clear previous timeout and set new one
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            $helpBtn.removeClass('small-btn');
        }, 200);
    });
});
