var TSA = TSA || {};

TSA.RebarsCalculator = {
    init: function () {
        // Initialize tabs and filtering
        this.setupTabs();

        // Initialize the slider
        this.initSlider();

        // Setup radio button change events for showing/hiding floor list
        this.setupRadioEvents();

        // Setup Step 1 functionality
        this.setupStep1();

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
            // Always show the floor list when any radio button is selected
            $('.flr-list').removeClass('hide');
        });

        // Trigger change for the default selected radio button
        $('.js-select-house:checked').trigger('change');
    },

    setupStep1: function() {
        $('#step1-btn').on('click', function () {
            // alert('Step 1 button clicked!');
            $('.calc-step.step-1').addClass('hide');
            $('.cp-rebar-estimator').removeClass('hide');
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

$(document).ready(function () {
    TSA.RebarsCalculator.init();
});
