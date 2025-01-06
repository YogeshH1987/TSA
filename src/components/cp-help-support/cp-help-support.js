$(".js-policies-scroll .list-item a[href^='#']").on('click', function (e) {
    // prevent default anchor click behavior
    e.preventDefault();

    // animate
    $('html, body').animate({
        scrollTop: $(this.hash).offset().top - 150
    }, 300, function () {
    });
});
