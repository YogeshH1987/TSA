var TSA = TSA || {};
TSA.buildingCostEst = {
    currentStep: 1, // Start from the first step

    // Initialize function
    init: function () {
        this.initSlider();
        this.setupStepNavigation();
        this.initSpaceRequirementCounters();
        this.initMaterialSelection();
        this.initBasement();
    },

    initSlider: function () {
        const builtUpAreaSlider = document.querySelector('[data-id="builtUpAreaRange"]');
        const numberFlrSlider = document.querySelector('[data-id="numberFlr"]');
        const animationContainer = document.getElementById('lottie-animation');
        const houseAnimationContainer = document.getElementById('house-animation');

        if (!animationContainer) return console.error('Lottie container not found!');
        if (!houseAnimationContainer) return console.error('House animation container not found!');

        // Load Lottie animations
        const animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'http://localhost:8000/components/cp-building-estimator/json/Artboard-5floor.json'
        });

        const houseAnimation = lottie.loadAnimation({
            container: houseAnimationContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'http://localhost:8000/components/cp-building-estimator/json/House.json'
        });

        if (builtUpAreaSlider) {
            noUiSlider.create(builtUpAreaSlider, {
                start: 700,
                connect: [true, false],
                range: { min: 200, max: 4000 },
                step: 100,
                pips: {
                    mode: 'positions',
                    values: [0, 100],
                    density: 100
                }
            });

            // Update input value when slider moves
            builtUpAreaSlider.noUiSlider.on('update', function (values, handle) {
                const sqFtValue = Math.round(values[handle]);
                document.getElementById('builtUpAreaValue').value = sqFtValue + ' Sq.ft';

                // Call animation update function with `window.buildingCostEstimator`
                window.buildingCostEstimator.updateHouseAnimation(sqFtValue, houseAnimation);
            });

            // Handle manual input change
            document.getElementById('builtUpAreaValue').addEventListener('change', function () {
                var value = parseInt(this.value.replace(' Sq.ft', ''), 10);
                if (value >= 200 && value <= 4000) {
                    builtUpAreaSlider.noUiSlider.set(value);
                }
            });
        }

        if (numberFlrSlider) {
            noUiSlider.create(numberFlrSlider, {
                start: 0,
                connect: [true, false],
                range: { min: 0, max: 4 },
                step: 1,
                pips: {
                    mode: 'values',
                    values: [0, 1, 2, 3, 4],
                    density: 2,
                    format: {
                        to: (value) => {
                            return ['1', '2', '3', '4', 'More'][value - 1];
                        }
                    }
                }
            });

            // Call the function using `window.buildingCostEstimator`
            window.buildingCostEstimator.animateLottieBasedOnSlider(numberFlrSlider, animation);
        }
    },

    // Function to animate Lottie based on slider value
    animateLottieBasedOnSlider: function (slider, animation) {
        if (!slider || !slider.noUiSlider || !animation) {
            console.warn("Slider or animation instance not found!");
            return;
        }

        const frameMapping = {
            1: 0,
            2: 50,
            3: 100,
            4: 150,
            5: 200
        };

        slider.noUiSlider.on("update", function (values, handle) {
            const floor = Math.round(values[handle]);
            console.log("Slider changed to:", floor);

            if (frameMapping[floor] !== undefined) {
                animation.goToAndStop(frameMapping[floor], true);
            }
        });
    },

    updateHouseAnimation: function (sqFtValue, houseAnimation) {
        if (!houseAnimation) return;

        const frame = Math.round(((sqFtValue - 200) / (4000 - 200)) * 100);

        console.log(`Built-Up Area: ${sqFtValue} Sq.ft → Animation Frame: ${frame}`);
        houseAnimation.goToAndStop(frame, true);
    },
    
    // Setup step navigation
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

        function showStep(stepNumber) {
            steps.forEach((step, index) => {
                step.classList.toggle('hide', index !== stepNumber - 1);
            });

            progressItems.forEach((item, index) => {
                item.classList.toggle('complete', index < stepNumber - 1);
                item.classList.toggle('ongoing', index === stepNumber - 1);
            });

            if (stepText) stepText.textContent = `Step - ${stepNumber}/${steps.length}`;
        }

        step1Btn.forEach(btn => {
            btn.addEventListener('click', function () {
                currentStep = 2;
                showStep(currentStep);
                actWrap.classList.remove('hide');
                progressBar.classList.remove('hide');
                $('.cp-building-estimator').removeClass('full-width');
                TSA.buildingCostEst.storeValues();
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                    actWrap.classList.remove('hide');
                    if (currentStep === 2) progressBar.classList.remove('hide');
                }
                TSA.buildingCostEst.storeValues();
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
                TSA.buildingCostEst.storeValues();
            });
        });

        showStep(currentStep);
    },

    // Initialize space requirement counters
    initSpaceRequirementCounters: function () {
        let storedSpaceRequirement = localStorage.getItem('spaceRequirement');
        let spaceRequirement = {};

        try {
            spaceRequirement = storedSpaceRequirement ? JSON.parse(storedSpaceRequirement) : {
                livingroom: 0, kitchen: 0, bedroom: 0, bathroom: 0, balcony: 0,
                pujaroom: 0, dinningarea: 0, storageroom: 0, garage: 0,
                servantroom: 0, hall: 0, study: 0
            };
        } catch (error) {
            console.warn('Error parsing spaceRequirement from localStorage:', error);
            spaceRequirement = {
                livingroom: 0, kitchen: 0, bedroom: 0, bathroom: 0, balcony: 0,
                pujaroom: 0, dinningarea: 0, storageroom: 0, garage: 0,
                servantroom: 0, hall: 0, study: 0
            };
        }

        function updateLocalStorage() {
            localStorage.setItem('spaceRequirement', JSON.stringify(spaceRequirement));
        }

        document.querySelectorAll('.btn-plus').forEach((button) => {
            button.addEventListener('click', (e) => {
                const inputField = e.target.previousElementSibling;
                let value = parseInt(inputField.value, 10) || 0;
                value++;
                inputField.value = value;
                const roomType = e.target.closest('.cp-img-detail').querySelector('.detail-tile').textContent.toLowerCase().replace(/\s+/g, "");
                spaceRequirement[roomType] = value;
                updateLocalStorage();
            });
        });

        document.querySelectorAll('.btn-minus').forEach((button) => {
            button.addEventListener('click', (e) => {
                const inputField = e.target.nextElementSibling;
                let value = parseInt(inputField.value, 10) || 0;
                if (value > 0) {
                    value--;
                    inputField.value = value;
                    const roomType = e.target.closest('.cp-img-detail').querySelector('.detail-tile').textContent.toLowerCase().replace(/\s+/g, "");
                    spaceRequirement[roomType] = value;
                    updateLocalStorage();
                }
            });
        });
    },

    // Initialize material selection
    initMaterialSelection: function () {
        const materialRadios = document.querySelectorAll('input[name="material"]');
    
        // Restore previously selected material from localStorage
        let storedMaterial = localStorage.getItem('selectedMaterial');
        if (storedMaterial) {
            materialRadios.forEach(radio => {
                if (radio.value === storedMaterial) {
                    radio.checked = true;
                    radio.closest('.bs-radio').classList.add('selected');
                }
            });
        }
    
        // Add event listener to update selection
        materialRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                // Remove 'selected' class from all options
                document.querySelectorAll('.bs-radio').forEach(el => el.classList.remove('selected'));
    
                // Add 'selected' class to the parent div of the checked radio
                this.closest('.bs-radio').classList.add('selected');
    
                // Store the selected material in localStorage
                localStorage.setItem('selectedMaterial', this.value);
            });
        });
    },    

    initBasement: function () {
        let buildingCostData = JSON.parse(localStorage.getItem('buildingCostData')) || { basement: false, selectedMaterial: null };
        const basementSwitch = document.getElementById('switch-rounded');
    
        // Restore the saved state for basement
        if (buildingCostData.basement) {
            basementSwitch.checked = true;
        }
    
        // Add event listener to update basement state
        basementSwitch.addEventListener('change', function () {
            buildingCostData.basement = this.checked;
            localStorage.setItem('buildingCostData', JSON.stringify(buildingCostData));
        });
    },
    
    initPlanSelection: function () {
        const planRadios = document.querySelectorAll('input[name="plan"]');
    
        // Restore previously selected plan from localStorage
        let storedPlan = localStorage.getItem('selectedPlan');
        if (storedPlan) {
            planRadios.forEach(radio => {
                if (radio.id === storedPlan) {
                    radio.checked = true;
                    radio.closest('.bs-radio').classList.add('selected');
                }
            });
        }
    
        // Add event listener to update selection
        planRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                // Remove 'selected' class from all options
                document.querySelectorAll('.bs-radio.typ-plan').forEach(el => el.classList.remove('selected'));
    
                // Add 'selected' class to the parent div of the checked radio
                this.closest('.bs-radio').classList.add('selected');
    
                // Store the selected plan in localStorage
                localStorage.setItem('selectedPlan', this.id);
            });
        });
    },
    
    // Store values in localStorage
    storeValues: function () {
        const builtUpAreaValue = document.getElementById('builtUpAreaValue').value.replace(' Sq.ft', '');
        const numberFlrValue = document.querySelector('[data-id="numberFlr"]').noUiSlider.get();
    
        let buildingCostData = JSON.parse(localStorage.getItem('buildingCostData')) || {};
        
        buildingCostData = {
            ...buildingCostData,  // Preserve existing values
            builtUpArea: parseInt(builtUpAreaValue),
            floor: parseInt(numberFlrValue),
            spaceRequirement: JSON.parse(localStorage.getItem('spaceRequirement')) || {},
            architecturalPlan: localStorage.getItem('selectedPlan') || '',
            selectedMaterial: localStorage.getItem('selectedMaterial') || 'standard',
        };
    
        localStorage.setItem('buildingCostData', JSON.stringify(buildingCostData));
        console.log('Updated buildingCostData:', buildingCostData);
    }    
};

// Check if data is stored in localStorage
function checkStoredData() {
    const storedData = localStorage.getItem('buildingCost');
    console.log(storedData ? JSON.parse(storedData) : 'No data found in localStorage.');
}

// Initialize the script when document is ready
$(document).ready(function () {
    TSA.buildingCostEst.init();
    checkStoredData();
});