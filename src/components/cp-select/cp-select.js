var winWidth = $(window).width();

$(document).ready(function () { 
    productSelectList(); // Initialize dropdown functionality
    selectDropdown(); // Check radio count and toggle visibility
});

$(window).resize(function () {  
    selectDropdown(); // Only call selectDropdown on resize
});

function productSelectList() {
    // Remove existing event handlers to prevent duplicates
    $('.select-dropdown-button').off('click').on('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling
        const $dropdownList = $(this).siblings('.select-dropdown-list'); // Target specific dropdown list
        $('.select-dropdown-list').not($dropdownList).removeClass('active'); // Close other dropdowns
        $dropdownList.toggleClass('active'); // Toggle current dropdown
    });

    $('.select-dropdown-list-item').off('click').on('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling
        const $dropdownButton = $(this).closest('.select-dropdown').find('.select-dropdown-button'); // Find the related button
        const itemValue = $(this).data('value');
        console.log(itemValue);
        $dropdownButton.find('span').text($(this).text()); // Update button text
        $dropdownButton.attr('data-value', itemValue); // Update data-value
        $(this).closest('.select-dropdown-list').removeClass('active'); // Close dropdown list
    });

    // Close dropdowns when clicking outside
    $(document).off('click').on('click', function() {
        $('.select-dropdown-list').removeClass('active');
    });
}

function selectDropdown() {
    if ($('.bs-radio').length > 4) {
        // Show cp-select if bs-radio elements are more than 4
        $('.cp-select.typ-pdp').show();
        $('.radio-wrap').hide();
    } else {
        $('.cp-select.typ-pdp').hide();
        $('.radio-wrap').show(); // Show radio-wrap if bs-radio is 4 or fewer
    }
}
