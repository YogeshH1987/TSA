document.addEventListener("DOMContentLoaded", function () {
    console.log("jQuery is ready");
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
        console.log("Scroll triggered");
        const scrollTop = $(this).scrollTop();
        console.log("scrolling...", scrollTop);
        if (scrollTop > 50) {
            $helpBtn.addClass('small-btn');
        } else {
            $helpBtn.removeClass('small-btn');
        }
    });
});

