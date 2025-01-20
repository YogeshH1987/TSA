//Scroll event
$(window).scroll(function () {
    var scrolled = $(window).scrollTop();
    if (scrolled > 200) $('#BackToTop').fadeIn('slow');
    if (scrolled < 200) $('#BackToTop').fadeOut('slow');
});

//Click event
$('#BackToTop').click(function () {
    $("html, body").animate({ scrollTop: "0" }, 500);
});
