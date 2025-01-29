var TSA = TSA || {};

TSA.RebarsCalculator = {
    init: function () {
        // Initialize tabs and filtering
        this.setupTabs();

        // Initialize the slider
        this.initSlider();

        // Setup radio button change events for showing/hiding floor list
        this.setupRadioEvents();

        // Setup unit conversion for area input
        this.setupUnitConversion();

        this.setupAreaValidation();
        // Setup Step 1 functionality
        // this.setupStep1();

        // Initialize the step navigation
        this.setupStepNavigation();        
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
    },

    setupRadioEvents: function () {
        $('.js-select-house').on('change', function () {
            const selectedValue = $(this).val(); // Get the selected radio button value
    
            // Check if the selected value is 'part-house'
            if (selectedValue === 'part-house') {
                $('.flr-list').removeClass('hide'); // Show the floor list
            } else {
                $('.flr-list').addClass('hide'); // Hide the floor list
            }
        });
    
        // Trigger change for the default selected radio button
        $('.js-select-house:checked').trigger('change');
    },    

    setupUnitConversion: function () {
        const toggleSwitch = $('.area-mesurement'); // Checkbox for unit toggle
        const desc = $('.calculator-desc'); // Description element
        const builtUpAreaValue = $('.builtUpAreaValue'); // Input field for area
        const errorMessage = $('.error'); // Error message element
        const step1Btn = $('#step1-btn'); // Button element
        const conversionFactors = {
            sqFtToSqMts: 0.092903,
            sqMtsToSqFt: 1 / 0.092903,
        };
        const limits = {
            sqFt: { min: 578, max: 1934 },
            sqMts: { min: 578 * 0.092903, max: 1934 * 0.092903 },
        };
    
        // Function to validate the area
        function validateArea() {
            const isSqFt = toggleSwitch.is(':checked'); // SqFt if toggle is unchecked
            const currentLimits = isSqFt ? limits.sqFt : limits.sqMts;
            const area = parseFloat(builtUpAreaValue.val());
        
            console.log('Validating Area:', area, 'against limits:', currentLimits);
        
            if (isNaN(area) || area < parseFloat(currentLimits.min.toFixed(2)) || area > parseFloat(currentLimits.max.toFixed(2))) {
                errorMessage.text(
                    `Please enter an area between ${currentLimits.min.toFixed(2)} and ${currentLimits.max.toFixed(2)} ${
                        isSqFt ? 'sq ft' : 'sq mts'
                    }.`
                );
                errorMessage.removeClass('hide');
                step1Btn.addClass('disabled');
            } else {
                errorMessage.addClass('hide');
                step1Btn.removeClass('disabled');
            }
        }       
    
        // Handle toggle switch change
        toggleSwitch.on('change', function () {
            const isSqFt = toggleSwitch.is(':checked'); // SqFt if toggle is unchecked
            const currentValue = parseFloat(builtUpAreaValue.val());
    
            // Convert the current value to the selected unit
            if (!isNaN(currentValue)) {
                const newValue = isSqFt
                    ? (currentValue * conversionFactors.sqMtsToSqFt).toFixed(2)
                    : (currentValue * conversionFactors.sqFtToSqMts).toFixed(2);
                builtUpAreaValue.val(newValue);
            }
    
            // Update the description text
            const currentLimits = isSqFt ? limits.sqFt : limits.sqMts;
            desc.text(
                `Enter area between ${currentLimits.min.toFixed(2)} ${
                    isSqFt ? 'sq mts' : 'sq ft'
                } - ${currentLimits.max.toFixed(2)} ${isSqFt ? 'sq mts' : 'sq ft'}`
            );
    
            validateArea(); // Validate after the toggle switch is changed
        });
    
        // Validate on input changes
        builtUpAreaValue.on('input', validateArea);
    
        // Initialize validation and description
        toggleSwitch.trigger('change');
    },
    
    setupAreaValidation: function () {
        const builtUpAreaValue = $('#builtUpAreaValue');
        const step1Btn = $('#step1-btn');
    
        // Delegate validation to `setupUnitConversion`
        step1Btn.on('click', function () {
            const area = parseFloat(builtUpAreaValue.val());
    
            if (step1Btn.hasClass('disabled')) {
                return false; // Prevent navigation if invalid
            }
    
            // Debugging: Log success and proceed
            console.log('Validation passed with area:', area);
            TSA.RebarsCalculator.setupStep1(); // Proceed to the next step
        });
    },
    
    setupStep1: function() {
        $('#step1-btn').on('click', function () {
            // alert('Step 1 button clicked!');
            $('.calc-step.step-1').addClass('hide');
            $('.cp-rebar-estimator').removeClass('hide');
            $('.cp-rebar-estimator').removeClass('full-width'); 
            $(this).parents('.bs-sec').finds('.sec-head.typ-rebar').addClass('typ-align-center');
        });
    },

    setupStepNavigation: function () {
        let currentStep = 1;
    
        const steps = document.querySelectorAll('.calc-step');
        const step1Btn = document.getElementById('step1-btn');
        const backBtns = document.querySelectorAll('.btn-back');
        const nextBtns = document.querySelectorAll('.btn-next');
        const actWrap = document.querySelector('.act-wrap');
        const progressBar = document.querySelector('.cp-stop-progressbar');
        const progressItems = document.querySelectorAll('.progress-bar .progress-item');
        const stepText = document.querySelector('.calc-progress-bar .step-text'); // Step text element
    
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
    
        step1Btn.addEventListener('click', function () {
            currentStep = 2;
            showStep(currentStep);
            actWrap.classList.remove('hide');
            progressBar.classList.remove('hide');
            $('.cp-rebar-estimator').removeClass('full-width');
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
                        $('.cp-rebar-estimator').addClass('full-width');
                    }
                }
            });
        });
    
        showStep(currentStep);
    }    
    
};

$(document).ready(function () {
    TSA.RebarsCalculator.init();
});
