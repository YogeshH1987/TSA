$(document).ready(function() {
    // stickyHeader();
    hamburgerMenu();
});

function stickyHeader(){
  var header = $('.cp-header');
  var offset = header.offset().top;

  $(window).scroll(function() {
    if ($(window).scrollTop() > offset) {
      header.addClass('js-fixed-header');
    } else {
      header.removeClass('js-fixed-header');
    }
  });
}

function hamburgerMenu(){
  $(".open-menu").click(function () {
    $(this).toggleClass("active");
    $(".nav-list").toggleClass("active")
    $("body").toggleClass("cm-overflow-hidden")
  });
}