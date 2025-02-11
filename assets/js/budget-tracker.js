var TSA = TSA || {};
TSA.budgetTrackerEst = { 
    
    init: function () {
        this.initSlider();
    },

    initSlider: function () {
        // Initialize noUiSlider for Built-Up Area
        const builtUpAreaSlider =  document.querySelector('[data-id="budgetTrackerRange"]');   
        noUiSlider.create(builtUpAreaSlider, {
            start: 500000,
            connect: [true, false],
            range: {
                'min': 500000,
                'max': 50000000
            },
            step: 100,
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 100,
                format: {
                    to: (value) =>'₹' + value // Format values as percentage
                }
    
            }
        });

        // Update input field on slider change
        builtUpAreaSlider.noUiSlider.on('update', function (values, handle) {
            var roundedValue = Math.round(values[handle]);
            document.getElementById('budgetTrackerValue').value ='₹' + roundedValue;
        });

    },
};
// Call the initialize function when document is ready

function setProgress(percent) {
    const circle = document.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    // Set the stroke-dasharray and stroke-dashoffset for the progress circle
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;

    // Update the text
    const progressText = document.querySelector('.progress-text');
  progressText.innerHTML = `${percent}% <br> <span class="text">Spent</span>`;
}

setProgress(85);


$(document).ready(function () {
    TSA.budgetTrackerEst.init();
});
