$(document).ready(function() {
  hamburgerMenu();
  navigationDropdown();
  profileDropDown();
});

$(window).resize(function () {
  navigationDropdown();
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
    // Mobile Click Behavior for .nav-item
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

    // Click on "Shop by category" to open the category grid
    $(document).on("click", ".js-shop-cat", function (e) {
      e.stopPropagation(); // Prevent event from propagating to the parent elements
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
      e.stopPropagation(); // Prevent event from propagating to the parent elements
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
      e.stopPropagation(); // Prevent event from propagating to the parent elements
      var $offersMenu = $(this).closest(".cp-sub-menu").find(".offers-list");

      if ($offersMenu.length) {
        $offersMenu.stop(true, true).fadeToggle(300).toggleClass("active");
      }

      // Close other sections when clicking on "Available offers"
      $(".cat-grid.open-inner-menu").fadeOut(300).removeClass("active");
      $(".menu-list.open-inner-menu").fadeOut(300).removeClass("active");
    });

    $(document).on("click", ".js-category-menu", function (e) {
      e.preventDefault();
      var $categoryMenu = $(this).parent().find(".open-category-menu").first();

      if ($categoryMenu.length) {
        $(".open-category-menu").not($categoryMenu).fadeOut(300); // Close other submenus
        $categoryMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    $(document).on("click", ".js-category-fabrication", function (e) {
      e.preventDefault();
      var $categoryMenu = $(this).find(".open-category-menu").first();

      if ($categoryMenu.length) {
        $(".open-category-menu").not($categoryMenu).fadeOut(300); // Close other submenus
        $categoryMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    $(document).on("click", ".js-category-interiors", function (e) {
      e.preventDefault();
      var $categoryMenu = $(this).find(".open-category-menu").first();

      if ($categoryMenu.length) {
        $(".open-category-menu").not($categoryMenu).fadeOut(300); // Close other submenus
        $categoryMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });
    $(document).on("click", ".js-category-tools", function (e) {
      e.preventDefault();
      var $categoryMenu = $(this).find(".open-category-menu").first();

      if ($categoryMenu.length) {
        $(".open-category-menu").not($categoryMenu).fadeOut(300); // Close other submenus
        $categoryMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    $(document).on("click", ".js-home-guide-menu", function (e) {
      e.stopPropagation(); // Prevent event from propagating to the parent elements
  
      // Select the .open-category-menu inside the same .lhs container
      var $categoryGrid = $(this).closest(".lhs").find(".open-category-menu");
  
      if ($categoryGrid.length) {
        $categoryGrid.stop(true, true).fadeToggle(300).toggleClass("active");
      }
  
      // Close other sections (if any) when clicking on "Explore by stage"
      $(".menu-list.open-inner-menu").fadeOut(300).removeClass("active");

    // Handle the case where the user clicks outside and wants to close the menu
      // if (!$(e.target).closest(".js-home-guide-menu, .open-category-menu").length) {
      //   $(".open-category-menu").fadeOut(300).removeClass("active");
      // }
    });
    $(document).on("click", ".js-home-guide-menu .inside-icon", function (e) {
      alert()
      e.preventDefault();
      $(this).closest(".lhs").find(".open-category-menu").fadeOut(300).removeClass("active");
    });

    $(document).on("click", ".js-learning-center", function (e) {
      e.stopPropagation(); // Prevent event from propagating to the parent elements
  
      // Select the .open-inner-menu inside the same .rhs container
      var $menuList = $(this).closest(".rhs").find(".open-inner-menu");
  
      if ($menuList.length) {
        alert("Toggling Learning Center Menu"); // Debugging alert, remove if not needed
        $menuList.stop(true, true).fadeToggle(300).toggleClass("active");
      }
  
      // Close other sections (if any) when clicking on "Learning Centre"
      $(".menu-list.open-inner-menu").fadeOut(300).removeClass("active");

      // Handle the case where the user clicks outside and wants to close the menu
      if (!$(e.target).closest(".js-learning-center, .open-inner-menu").length) {
        $(".open-inner-menu").fadeOut(300).removeClass("active");
      }
    });

    $(document).on("click", ".js-region-menu", function (e) {
      e.preventDefault();
      var $regionMenu = $(this).parent().find(".open-region-menu").first();

      if ($regionMenu.length) {
        $(".open-region-menu").not($regionMenu).fadeOut(300); // Close other submenus
        $regionMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    $(document).on("click", ".js-budget-menu", function (e) {
      e.preventDefault();
      var $budgetMenu = $(this).parent().find(".open-budget-menu").first();

      if ($budgetMenu.length) {
        $(".open-budget-menu").not($budgetMenu).fadeOut(300); // Close other submenus
        $budgetMenu.stop(true, true).fadeToggle(300); // Toggle submenu
      }
    });

    // Close Navigation with "js-close-nav"
    $(document).on("click", ".js-close-nav", function (e) {
      e.stopPropagation(); // Prevent the click from bubbling up
      $(".sub-nav-menu, .cat-grid, .menu-list, .offers-list").fadeOut(300).removeClass("active");
    });

    $(document).on("click", ".inside-icon", function (e) {
      e.preventDefault();
    
      // Close any currently open .open-inner-menu
      $(".open-inner-menu").fadeOut(300).removeClass("active");
      $(this).parents(".open-inner-menu").fadeOut(300).removeClass("active");
    
    });
    
    
  }
}

function profileDropDown() {
  $(document).on('click', '.js-profile-state', function() {
    $(".profile-wrap").fadeIn();
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




