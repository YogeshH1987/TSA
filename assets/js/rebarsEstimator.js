var TSA = TSA || {};

TSA.RebarsCalculator = {
    init: function () {
        this.setupTabs();
        this.initSlider();
        this.setupRadioEvents();
        this.setupUnitConversion();
        this.setupAreaValidation();
        this.setupStepNavigation();
    },

    setupTabs: function () {
        const $tabs = $('.js-plan-flr .tab-item');

        $tabs.on('click', function () {
            $tabs.removeClass('active');
            $(this).addClass('active');
            TSA.RebarsCalculator.filterByDataVal($(this).data('target').substring(1));
        });

        $tabs.filter('.active').trigger('click');
    },

    filterByDataVal: function (target) {
        $('.js-plan-flr .bs-radio').each(function () {
            $(this).toggle($(this).data('val') === target);
        });
    },

    initSlider: function () {
        const numberFlrSlider = document.getElementById('numberFlr');
        if (!numberFlrSlider) return console.error('Slider element not found!');
        
        const animationContainer = document.getElementById('lottie-animation');
        if (!animationContainer) return console.error('Lottie container not found!');
        
        // Load Lottie animation
        const animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: false,  // Change to `true` if you want it to loop
            autoplay: false,
            path: 'http://localhost:8000/components/cp-rebar-estimator/json/verticalBuilding.json'  // Update with the correct JSON path
        });
    
        // Initialize noUiSlider
        noUiSlider.create(numberFlrSlider, {
            start: 0,
            connect: [true, false],
            range: { min: 0, max: 2 },
            step: 1,
            pips: {
                mode: 'values',
                values: [0, 1, 2],
                density: 2,
                format: { to: (value) => ['Ground', 'G+1', 'G+2'][value] }
            }
        });
    
        // Play animation based on slider value
        numberFlrSlider.noUiSlider.on('update', function (values, handle) {
            const floor = Math.round(values[handle]);
            console.log('Slider changed to:', floor);
            
            // Map slider value to animation frames or actions
            if (floor === 0) {
                animation.goToAndStop(0, true); // Ground level frame
            } else if (floor === 1) {
                animation.goToAndStop(50, true); // G+1 level frame
            } else if (floor === 2) {
                animation.goToAndStop(100, true); // G+2 level frame
            }
        });
    },        

    setupRadioEvents: function () {
        $(document).on('change', '.js-select-house', function () {
            $('.flr-list').toggleClass('hide', $(this).val() !== 'part-house');
        });

        $('.js-select-house:checked').trigger('change');
    },

    setupUnitConversion: function () {
        const $toggleSwitch = $('.area-mesurement');
        const $desc = $('.calculator-desc');
        const $builtUpArea = $('.builtUpAreaValue');
        const $error = $('.error');
        const $step1Btn = $('#step1-btn');

        const conversion = { sqFtToSqMts: 0.092903, sqMtsToSqFt: 10.764 };
        const limits = { sqFt: { min: 578, max: 1934 }, sqMts: { min: 578 * conversion.sqFtToSqMts, max: 1934 * conversion.sqFtToSqMts } };

        function validateArea() {
            const isSqFt = $toggleSwitch.is(':checked');
            const range = isSqFt ? limits.sqFt : limits.sqMts;
            const value = parseFloat($builtUpArea.val());

            if (isNaN(value) || value < range.min || value > range.max) {
                $error.text(`Enter area between ${range.min.toFixed(2)} - ${range.max.toFixed(2)} ${isSqFt ? 'sq ft' : 'sq mts'}`).removeClass('hide');
                $step1Btn.addClass('disabled');
            } else {
                $error.addClass('hide');
                $step1Btn.removeClass('disabled');
            }
        }

        $toggleSwitch.on('change', function () {
            const isSqFt = $(this).is(':checked');
            const currentValue = parseFloat($builtUpArea.val());

            if (!isNaN(currentValue)) {
                $builtUpArea.val((currentValue * (isSqFt ? conversion.sqMtsToSqFt : conversion.sqFtToSqMts)).toFixed(2));
            }

            const range = isSqFt ? limits.sqFt : limits.sqMts;
            $desc.text(`Enter area between ${range.min.toFixed(2)} - ${range.max.toFixed(2)} ${isSqFt ? 'sq mts' : 'sq ft'}`);

            validateArea();
        });

        $builtUpArea.on('input', validateArea);
        $toggleSwitch.trigger('change');
    },

    setupAreaValidation: function () {
        $('#step1-btn').on('click', function () {
            if ($(this).hasClass('disabled')) return false;
            console.log('Validation passed!');
            TSA.RebarsCalculator.setupStep1();
        });
    },

    setupStep1: function () {
        $('#step1-btn').on('click', function () {
            $('.calc-step.step-1').addClass('hide');
            $('.cp-rebar-estimator').removeClass('hide full-width');
            $('.bs-sec .sec-head.typ-rebar').addClass('typ-align-center');
        });
    },

    setupStepNavigation: function () {
        let currentStep = 1;
        const $steps = $('.calc-step');
        const $step1Btn = $('#step1-btn');
        const $actWrap = $('.act-wrap');
        const $progressBar = $('.cp-stop-progressbar');
        const $progressItems = $('.progress-bar .progress-item');
        const $stepText = $('.calc-progress-bar .step-text');

        function showStep(step) {
            $steps.addClass('hide').eq(step - 1).removeClass('hide');
            $progressItems.removeClass('complete ongoing')
                .slice(0, step - 1).addClass('complete')
                .end().eq(step - 1).addClass('ongoing');

            $stepText.text(`Step - ${step}/${$steps.length}`);
        }

        $step1Btn.on('click', function () {
            currentStep = 2;
            showStep(currentStep);
            $actWrap.removeClass('hide');
            $progressBar.removeClass('hide');
            $('.cp-rebar-estimator').removeClass('full-width');
        });

        $(document).on('click', '.btn-next', function () {
            if (currentStep < $steps.length) showStep(++currentStep);
        });

        $(document).on('click', '.btn-back', function () {
            if (currentStep > 1) {
                showStep(--currentStep);
                if (currentStep === 1) {
                    $progressBar.addClass('hide');
                    $actWrap.addClass('hide');
                    $('.cp-rebar-estimator').addClass('full-width');
                }
            }
        });

        showStep(currentStep);
    }
};

$(document).ready(() => TSA.RebarsCalculator.init());
