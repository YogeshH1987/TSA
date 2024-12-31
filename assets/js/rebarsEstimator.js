var TSA = TSA || {};

TSA.RebarsCalculator = {
    init: function () {
        // Initialize tabs and filtering
        this.setupTabs();

        // Initialize the slider
        this.initSlider();
    },

    setupTabs: function () {
        $('.js-plan-flr .tab-item').on('click', function () {
            // Remove active class from all tabs
            $('.js-plan-flr .tab-item').removeClass('active');
            // Add active class to the clicked tab
            $(this).addClass('active');

            // Get the data-target of the clicked tab
            const target = $(this).data('target').substring(1); // Remove the "#" from the value

            // Filter radio buttons based on data-val
            TSA.RebarsCalculator.filterByDataVal(target);
        });

        // Trigger the first tab by default
        $('.js-plan-flr .tab-item.active').trigger('click');
    },

    filterByDataVal: function (target) {
        $('.js-plan-flr .bs-radio').each(function () {
            // Show only elements with matching data-val
            if ($(this).data('val') === target) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    },

    initSlider: function () {
        const numberFlrSlider = document.getElementById('numberFlr');

        // Check if the slider element exists
        if (!numberFlrSlider) {
            console.error('Slider element not found!');
            return;
        }

        // Initialize the slider
        noUiSlider.create(numberFlrSlider, {
            start: 0, // Default starting position (Ground)
            connect: [true, false],
            range: {
                min: 0, // Ground
                max: 2  // G+2
            },
            step: 1,
            pips: {
                mode: 'values',
                values: [0, 1, 2], // Ground, G+1, G+2
                density: 2,
                format: {
                    to: (value) => {
                        if (value === 0) return 'Ground';
                        if (value === 1) return 'G+1';
                        if (value === 2) return 'G+2';
                    }
                }
            }
        });
    }
};

$(document).ready(function () {
    TSA.RebarsCalculator.init();
});
