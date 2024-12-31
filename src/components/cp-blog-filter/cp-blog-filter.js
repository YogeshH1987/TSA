$(document).ready(function () {
    const winWidth = $(window).width();

    if (winWidth > 768) { // Apply this functionality only for desktop
        // Show the first filter menu list by default when .cp-drawer is active
        if ($('.cp-drawer').hasClass('active')) {
            $('.cp-drawer.active .filter-menu-list').first().show().addClass('active');
            alert("hi")
        }

        // Handle list-item click
        $('.list-item').on('click', function (e) {
            e.stopPropagation(); // Prevent clicks from propagating to other elements

            const $currentMenuList = $(this).find('.filter-menu-list');

            // Toggle visibility and active class of the clicked list item's menu
            if ($currentMenuList.is(':visible')) {
                $currentMenuList.hide().removeClass('active'); // Hide if already visible
            } else {
                $('.filter-menu-list').hide().removeClass('active'); // Hide all other open menus
                $currentMenuList.show().addClass('active'); // Show the clicked one and add active class
            }
        });

        // Handle js-close-btn click to remove active class
        $('.js-close-btn').on('click', function () {
            $('.filter-menu-list').hide().removeClass('active'); // Hide all filter-menu-lists
            $('.cp-drawer').removeClass('active'); // Remove active class from cp-drawer
        });
    }
});
