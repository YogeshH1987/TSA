var TSA = TSA || {};
TSA.buildingCostEst = { 
    init: function () {
        // Initialize the slider
        this.initSlider();
    },

    initSlider: function () {
        // Initialize noUiSlider
        var builtUpAreaSlider = document.getElementById('builtUpAreaRange');
        const numberFlrSlider = document.getElementById('numberFlr');

        noUiSlider.create(builtUpAreaSlider, {
            start: 700, // Default starting value
            connect: [true, false], // Only show fill on the left side
            range: {
                'min': 200,  // Minimum value
                'max': 4000  // Maximum value
            },
            step: 100,
            pips: {
                mode: 'positions',
                values: [0, 100], // Only show min and max
                density: 100
            }
        });

        // Update the text input when the slider value changes
        builtUpAreaSlider.noUiSlider.on('update', function (values, handle) {
            // Convert the value to an integer and update the input field
            var roundedValue = Math.round(values[handle]);
            document.getElementById('builtUpAreaValue').value = roundedValue + ' Sq.ft';
        });

        // Optional: Update the input field on focus if you want to enter a value manually
        document.getElementById('builtUpAreaValue').addEventListener('change', function () {
            var value = parseInt(this.value.replace(' Sq.ft', ''), 10);
            if (value >= 200 && value <= 4000) {
                builtUpAreaSlider.noUiSlider.set(value);
            }
        });

        noUiSlider.create(numberFlrSlider, {
            start: 0, // Default starting position (Ground)
            connect: [true, false],
            range: {
                min: 0, 
                max: 4 
            },
            step: 1,
            pips: {
                mode: 'values',
                values: [0, 1, 2, 3, 4], // Ground, G+1, G+2
                density: 2,
                format: {
                    to: (value) => {
                        if (value === 0) return '1';
                        if (value === 1) return '2';
                        if (value === 2) return '3';
                        if (value === 3) return '4';
                        if (value === 4) return 'More';
                    }
                }
            }
        });
    }
};

// Call the calculate function on document ready
$(document).ready(function () {
    TSA.buildingCostEst.init();
});
