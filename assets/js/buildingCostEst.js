var TSA = TSA || {};
TSA.buildingCostEst = { 
    currentStep: 1, // Start from the first step
    
    init: function () {
        this.initSlider();
        this.setupStepNavigation();
    },

    initSlider: function () {
        // Initialize noUiSlider for Built-Up Area
        const builtUpAreaSlider =  document.querySelector('[data-id="builtUpAreaRange"]');        
        const numberFlrSlider =  document.querySelector('[data-id="numberFlr"]');

        noUiSlider.create(builtUpAreaSlider, {
            start: 700,
            connect: [true, false],
            range: {
                'min': 200,
                'max': 4000
            },
            step: 100,
            pips: {
                mode: 'positions',
                values: [0, 100],
                density: 100
            }
        });

        // Update input field on slider change
        builtUpAreaSlider.noUiSlider.on('update', function (values, handle) {
            var roundedValue = Math.round(values[handle]);
            document.getElementById('builtUpAreaValue').value = roundedValue + ' Sq.ft';
        });

        // Optional: Allow manual input in the text box
        document.getElementById('builtUpAreaValue').addEventListener('change', function () {
            var value = parseInt(this.value.replace(' Sq.ft', ''), 10);
            if (value >= 200 && value <= 4000) {
                builtUpAreaSlider.noUiSlider.set(value);
            }
        });

        // Initialize noUiSlider for Floors
        noUiSlider.create(numberFlrSlider, {
            start: 0,
            connect: [true, false],
            range: {
                min: 0,
                max: 4
            },
            step: 1,
            pips: {
                mode: 'values',
                values: [0, 1, 2, 3, 4],
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
    },

    // Setup step navigation and progress bar
    setupStepNavigation: function () {
        let currentStep = this.currentStep;
        const steps = document.querySelectorAll('.calc-step');
        const step1Btn = document.querySelectorAll('.step1Btn');
        const backBtns = document.querySelectorAll('.btn-back');
        const nextBtns = document.querySelectorAll('.btn-next');
        const actWrap = document.querySelector('.act-wrap');
        const progressBar = document.querySelector('.cp-stop-progressbar');
        const progressItems = document.querySelectorAll('.progress-bar .progress-item');
        const stepText = document.querySelector('.calc-progress-bar .step-text');
    
        // Function to show the current step
        function showStep(stepNumber) {
            steps.forEach((step, index) => {
                if (index === stepNumber - 1) {
                    step.classList.remove('hide');
                } else {
                    step.classList.add('hide');
                }
            });

            // Update the progress bar
            progressItems.forEach((item, index) => {
                if (index < stepNumber - 1) {
                    item.classList.add('complete');
                    item.classList.remove('ongoing');
                } else if (index === stepNumber - 1) {
                    item.classList.add('ongoing');
                    item.classList.remove('complete');
                } else {
                    item.classList.remove('complete', 'ongoing');
                }
            });

            // Update step-text
            if (stepText) {
                stepText.textContent = `Step - ${stepNumber}/${steps.length}`;
            }
        }
    
        step1Btn.forEach(btn => {
            btn.addEventListener('click', function () {
                currentStep = 2;
                showStep(currentStep);
                actWrap.classList.remove('hide');
                progressBar.classList.remove('hide');
                $('.cp-building-estimator').removeClass('full-width');
            });
        });
    
        nextBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    actWrap.classList.remove('hide');
                    if (currentStep === 2) {
                        progressBar.classList.remove('hide');
                    }
                }
            });
        });
    
        backBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (currentStep > 1) {
                    currentStep--;
                    showStep(currentStep);
                    if (currentStep === 1) {
                        progressBar.classList.add('hide');
                        actWrap.classList.add('hide');
                    }
                }
            });
        });
    
        showStep(currentStep);
    }   
};

// Call the initialize function when document is ready
$(document).ready(function () {
    TSA.buildingCostEst.init();
});
