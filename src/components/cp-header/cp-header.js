$(document).ready(function() {
  hamburgerMenu();
  navigationDropdown();
  profileDropDown();
});

$(window).resize(function () {
  navigationDropdown();
});

function stickyHeader() {
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

function hamburgerMenu() {
  $(".open-menu").click(function () {
    $(".nav-list").addClass("active");
    $(".bottom-sec").addClass("active");
    $("body").addClass("cm-overflow-hidden");
  });

  $(".close").click(function () {
    $(".nav-list").removeClass("active");
    $(".bottom-sec").removeClass("active");
    $("body").removeClass("cm-overflow-hidden");
  });
}

function navigationDropdown() {
  var winWidth = $(window).width();

  // Function to handle submenu toggling
  function toggleMenu($menu) {
    $menu.stop(true, true).fadeToggle(300);
    $(".sub-nav-menu, .cat-grid, .menu-list, .offers-list").not($menu).fadeOut(300).removeClass("active");
  }

  if (winWidth > 768) {
    // Desktop Hover Behavior
    $(".nav-item").hover(
      function () {
        $(this).children(".sub-nav-menu").stop(true, true).fadeIn(300);
      },
      function () {
        $(this).children(".sub-nav-menu").stop(true, true).fadeOut(300);
      }
    );
  } else {
    // Mobile Click Behavior
    $(document).on("click", ".nav-item > a", function (e) {
      e.preventDefault();
      var $submenu = $(this).parent().find(".sub-nav-menu").first();

      if ($submenu.length) {
        $(".sub-nav-menu").not($submenu).fadeOut(300); // Close other submenus
        $submenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    // Close menus when clicking outside
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".nav-item").length) {
        $(".sub-nav-menu").fadeOut(300);
      }
    });

    // Handle specific menu toggles
    $(document).on("click", ".js-shop-cat", function (e) {
      e.stopPropagation(); // Prevent event from propagating to parent elements
      var $categoryGrid = $(this).closest(".cp-sub-menu").find(".cat-grid");

      if ($categoryGrid.length) {
        $categoryGrid.stop(true, true).fadeToggle(300).toggleClass("active");
      }

      // Close other sections when clicking on "Shop by category"
      $(".menu-list.open-inner-menu").fadeOut(300).removeClass("active");
      $(".offers-list.typ-sub-menu.open-inner-menu").fadeOut(300).removeClass("active");
    });

    // Click on "Shop by brand" to open the brand menu
    $(document).on("click", ".js-brand-menu", function (e) {
      e.stopPropagation(); // Prevent event from propagating to parent elements
      var $brandMenu = $(this).closest(".cp-sub-menu").find(".menu-list");

      if ($brandMenu.length) {
        $brandMenu.stop(true, true).fadeToggle(300).toggleClass("active");
      }

      // Close other sections when clicking on "Shop by brand"
      $(".cat-grid.open-inner-menu").fadeOut(300).removeClass("active");
      $(".offers-list.typ-sub-menu.open-inner-menu").fadeOut(300).removeClass("active");
    });

    // Click on "Available offers" to open the offers list
    $(document).on("click", ".js-offers-menu", function (e) {
      e.stopPropagation(); // Prevent event from propagating to parent elements
      var $offersMenu = $(this).closest(".cp-sub-menu").find(".offers-list");

      if ($offersMenu.length) {
        $offersMenu.stop(true, true).fadeToggle(300).toggleClass("active");
      }

      // Close other sections when clicking on "Available offers"
      $(".cat-grid.open-inner-menu").fadeOut(300).removeClass("active");
      $(".menu-list.open-inner-menu").fadeOut(300).removeClass("active");
    });

    $(document).on("click", ".js-category-menu, .js-category-fabrication, .js-category-interiors, .js-category-tools", function (e) {
      e.preventDefault();
      var $categoryMenu = $(this).find(".open-category-menu").first();

      if ($categoryMenu.length) {
        $(".open-category-menu").not($categoryMenu).fadeOut(300); // Close other submenus
        $categoryMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    // Close Navigation with "js-close-nav"
    $(document).on("click", ".js-close-nav", function (e) {
      e.stopPropagation(); // Prevent the click from bubbling up
      $(".sub-nav-menu, .cat-grid, .menu-list, .offers-list").fadeOut(300).removeClass("active");
    });

    // Close opened menu when clicking on the icon inside the menu
    $(document).on("click", ".inside-icon", function (e) {
      e.preventDefault();
      $(".open-inner-menu").fadeOut(300).removeClass("active");
      $(this).parents(".open-inner-menu").fadeOut(300).removeClass("active");
    });
  }
}

function profileDropDown() {
  $(document).on('click', '.js-profile-state', function() {
    $(".profile-wrap").stop(true, true).fadeIn(300); // Ensure profile menu doesn't conflict with other animations
  });

  $(document).on('click', '.profile-link', function(e) {
    e.preventDefault();
    $(".profile-link").removeClass("active");
    $(this).addClass("active");
    $(".profile-wrap").fadeOut();
  });

  $(document).on('click', function(event) {
    if (!$(event.target).closest(".profile-wrap, .js-profile-state").length) {
      $(".profile-wrap").fadeOut();
    }
  });
}
