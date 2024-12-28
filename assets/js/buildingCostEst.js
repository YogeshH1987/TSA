var TSA = TSA || {};
TSA.buildingCostEst = {};

TSA.buildingCostEst.calculate = function () {
    const rangeSlider = document.getElementById("builtUpAreaRange");
    const textInput = document.getElementById("builtUpAreaValue");

    // Initialize noUiSlider
    noUiSlider.create(rangeSlider, {
        start: 700,
        step: 10,
        range: {
            min: 100,
            max: 4000,
        },
        tooltips: true, // Optional: Displays the value as a tooltip on the slider
        format: {
            to: function (value) {
                return `${Math.round(value)} Sq.ft`;
            },
            from: function (value) {
                return Number(value.replace(" Sq.ft", ""));
            },
        },
    });

    // Update the text input when the slider value changes
    rangeSlider.noUiSlider.on("update", function (values, handle) {
        textInput.value = values[handle];
    });

    // Update the slider when the text input changes
    textInput.addEventListener("input", function () {
        const value = parseInt(this.value.replace(/\D/g, ""), 10); // Remove non-numeric characters
        if (!isNaN(value) && value >= 100 && value <= 4000) {
            rangeSlider.noUiSlider.set(value);
        }
    });

    // Get the minimum and maximum values
    const sliderOptions = rangeSlider.noUiSlider.options.range;
    const minValue = sliderOptions.min;
    const maxValue = sliderOptions.max;

    console.log("Minimum value:", minValue);
    console.log("Maximum value:", maxValue);

    // Optional: Display min and max values in the UI
    const minMaxContainer = document.createElement("div");
    minMaxContainer.classList.add("slider-min-max");
    minMaxContainer.innerHTML = `
        <span class="min-value">Min: ${minValue} Sq.ft</span>
        <span class="max-value">Max: ${maxValue} Sq.ft</span>
    `;
    rangeSlider.parentElement.appendChild(minMaxContainer);
};

// Call the calculate function on document ready
$(document).ready(function () {
    TSA.buildingCostEst.calculate();
});
