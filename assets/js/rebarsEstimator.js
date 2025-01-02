var TSA = TSA || {};

TSA.RebarsCalculator = {
    init: function () {
        // Initialize tabs and filtering
        this.setupTabs();

        // Initialize the slider
        this.initSlider();

        // Setup radio button change events for showing/hiding floor list
        this.setupRadioEvents();


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

    setupAreaValidation: function () {
        const builtUpAreaValue = $('#builtUpAreaValue');
        const errorMessage = $('.error');
        const step1Btn = $('#step1-btn');
    
        // Listen for input or change events on the area field
        builtUpAreaValue.on('input', function () {
            const area = parseFloat(builtUpAreaValue.val());
    
            if (area < 578 || area > 1934 || isNaN(area)) {
                // Show error and disable the button if the area is out of range or invalid
                errorMessage.removeClass('hide');
                step1Btn.addClass('disabled');
            } else {
                // Hide error and enable the button if the area is within range
                errorMessage.addClass('hide');
                step1Btn.removeClass('disabled');
            }
        });
    
        // Validate on button click as well
        step1Btn.on('click', function () {
            const area = parseFloat(builtUpAreaValue.val());
    
            if (area < 578 || area > 1934 || isNaN(area)) {
                errorMessage.removeClass('hide');
                step1Btn.addClass('disabled');
                return false; // Prevent moving to the next step
            } else {
                errorMessage.addClass('hide');
                step1Btn.removeClass('disabled');
                TSA.RebarsCalculator.setupStep1(); // Proceed to the next step
            }
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
        const progressItems = document.querySelectorAll('.progress-bar .progress-item'); // Progress items
    
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
