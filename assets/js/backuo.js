var TSA = TSA || {};

TSA.buildingCostEst = {
    currentStep: 1, // Start from the first step
    buildingCostLocal: {
        architecturalPlan : "",
        basement :false,
        builtUpArea: 700,
        currentStep: 5,
        numberFlr: 1,
        selectedMaterial: "standard",
        spaceRequirement: { livingroom: 0, kitchen: 0, bedroom: 0, bathroom: 0, balcony: 0,
            pujaroom: 0, dinningarea: 0, storageroom: 0, garage: 0,
            servantroom: 0, hall: 0, study: 0}
    },
    // Initialize function
    init: function () {
        try {
            this.initSlider();
            this.setupStepNavigation();
            this.initSpaceRequirementCounters();
            this.initMaterialSelection();
            this.initBasement();
            this.initMaterialSkip();
        } catch (err) {
            console.error("Error during initialization:", err);
        }
    },

    getBuildingCostData: function () {
        return JSON.parse(localStorage.getItem("buildingCost")) || {};
    },

    updateLocalStorage: function (updatedData) {
        const data = this.getBuildingCostData();
        const newData = { ...data, ...updatedData };
        localStorage.setItem("buildingCost", JSON.stringify(newData));
    },

    initSlider: function () {
        try {
            const builtUpAreaSlider = document.querySelector('[data-id="builtUpAreaRange"]');
            const numberFlrSlider = document.querySelector('[data-id="numberFlr"]');
            const houseAnimationContainer = document.getElementById('house-animation');
            const animationContainer = document.getElementById('lottie-animation');

            if (!houseAnimationContainer) {
                throw new Error('House animation container not found!');
            }
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
                    start: this.getBuildingCostData().builtUpArea || 700,
                    connect: [true, false],
                    range: { min: 200, max: 4000 },
                    step: 100
                });

                builtUpAreaSlider.noUiSlider.on('update', (values, handle) => {
                    const sqFtValue = Math.round(values[handle]);
                    document.getElementById('builtUpAreaValue').value = `${sqFtValue} Sq.ft`;
                    this.setBuildingCostData({ builtUpArea: sqFtValue });
                    houseAnimation.goToAndStop(Math.round((sqFtValue - 200) / (4000 - 200) * 200), true);
                });
            }

            if (numberFlrSlider) {
                noUiSlider.create(numberFlrSlider, {
                    start: this.getBuildingCostData().numberFlr || 0,
                    connect: [true, false],
                    range: { min: 0, max: 4 },
                    step: 1,
                    pips: {
                        mode: 'values',
                        values: [0, 1, 2, 3, 4],
                        density: 2,
                        format: {
                            to: (value) => {
                                const labels = ['0', '1', '2', '3', 'More']; // Properly indexed
                                return labels[value]; 
                            }
                        }
                    }
                });

                numberFlrSlider.noUiSlider.on("update", (values, handle) => {
                    const floor = Math.round(values[handle]);
                    this.setBuildingCostData({ numberFlr: floor });
                    const frameMapping = {
                        1: 0,
                        2: 50,
                        3: 100,
                        4: 150,
                        5: 200
                    };
                    if (frameMapping[floor] !== undefined) {
                        animation.goToAndStop(frameMapping[floor], true);
                    }
                });
                
            }
        } catch (err) {
            console.error("Error in initSlider:", err);
        }
    },

    setupStepNavigation: function () {
        let currentStep = this.getBuildingCostData().currentStep || 1;
        const steps = document.querySelectorAll('.calc-step');
        const step1Btn = document.querySelectorAll('.step1Btn');
        const backBtns = document.querySelectorAll('.btn-back');
        const nextBtns = document.querySelectorAll('.btn-next');
        const actWrap = document.querySelector('.act-wrap');
        const progressBar = document.querySelector('.cp-stop-progressbar');
        const progressItems = document.querySelectorAll('.progress-bar .progress-item');
        const stepText = document.querySelector('.calc-progress-bar .step-text');

        function showStep(stepNumber) {
            steps.forEach((step, index) => step.classList.toggle('hide', index !== stepNumber - 1));
            progressItems.forEach((item, index) => {
                item.classList.toggle('complete', index < stepNumber - 1);
                item.classList.toggle('ongoing', index === stepNumber - 1);
            });
            if (stepText) stepText.textContent = `Step - ${stepNumber}/${steps.length}`;
        }

        step1Btn.forEach(btn => btn.addEventListener('click', () => {
            currentStep = 2;
            showStep(currentStep);
            actWrap.classList.remove('hide');
            progressBar.classList.remove('hide');
            $('.cp-building-estimator').removeClass('full-width');
            this.setBuildingCostData({ currentStep });
        }));

        nextBtns.forEach(btn => btn.addEventListener('click', () => {
            if (currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
                actWrap.classList.remove('hide');
                if (currentStep === 2) progressBar.classList.remove('hide');
            }
            this.setBuildingCostData({ currentStep });
        }));

        backBtns.forEach(btn => btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
                if (currentStep === 1) {
                    progressBar.classList.add('hide');
                    actWrap.classList.add('hide');
                }
            }
            this.setBuildingCostData({ currentStep });
        }));

        showStep(currentStep);
    },

    initSpaceRequirementCounters: function () {
        let spaceRequirement = this.getBuildingCostData().spaceRequirement || {};
        const minCount = 0;
        const maxCount = 5;

        function updateLocalStorage() {
            TSA.buildingCostEst.setBuildingCostData({ spaceRequirement });
        }

        $(".cp-counter").each(function () {
            const counter = $(this);

            counter.find(".btn-plus").click(function (e) {
                const input = counter.find(".number-product");
                let value = parseInt(input.val()) || minCount;
                const roomType = e.target.closest('.cp-img-detail').querySelector('.detail-tile').textContent.toLowerCase().replace(/\s+/g, "");
                spaceRequirement[roomType] = Math.min(value + 1, maxCount);
                input.val(spaceRequirement[roomType]);
                updateLocalStorage();
            });

            counter.find(".btn-minus").click(function (e) {
                const input = counter.find(".number-product");
                let value = parseInt(input.val()) || minCount;
                const roomType = e.target.closest('.cp-img-detail').querySelector('.detail-tile').textContent.toLowerCase().replace(/\s+/g, "");
                spaceRequirement[roomType] = Math.max(value - 1, minCount);
                input.val(spaceRequirement[roomType]);
                updateLocalStorage();
            });

            counter.find(".number-product").on("input", function (e) {
                const input = $(this);
                let value = parseInt(input.val()) || minCount;
                const roomType = e.target.closest('.cp-img-detail').querySelector('.detail-tile').textContent.toLowerCase().replace(/\s+/g, "");
                spaceRequirement[roomType] = Math.min(Math.max(value, minCount), maxCount);
                input.val(spaceRequirement[roomType]);
                updateLocalStorage();
            });
        });
    },

    // Initialize material selection
    initMaterialSelection: function () {
        const materialRadios = document.querySelectorAll('input[name="material"]');
        let storedMaterial = TSA.buildingCostEst.getBuildingCostData().selectedMaterial;
        if (storedMaterial) {
            materialRadios.forEach(radio => {
                if (radio.value === storedMaterial) {
                    radio.checked = true;
                    radio.closest('.bs-radio').classList.add('selected');
                }
            });
        }
        materialRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                document.querySelectorAll('.bs-radio').forEach(el => el.classList.remove('selected'));
                this.closest('.bs-radio').classList.add('selected');
                TSA.buildingCostEst.setBuildingCostData({ selectedMaterial: this.value });
            });
        });
    },
    
    // Initialize basement toggle
    initBasement: function () {
        let buildingCostData = TSA.buildingCostEst.getBuildingCostData();
        const basementSwitch = document.getElementById('switch-rounded');
        if (buildingCostData.basement) {
            basementSwitch.checked = buildingCostData.basement;
        }
        basementSwitch.addEventListener('change', function () {
            TSA.buildingCostEst.setBuildingCostData({ basement: this.checked });
        });
    },
    
    // Initialize plan selection
    initPlanSelection: function () {
        const planRadios = document.querySelectorAll('input[name="plan"]');
        let storedPlan = TSA.buildingCostEst.getBuildingCostData();
        if (storedPlan.architecturalPlan) {
            planRadios.forEach(radio => {
                if (radio.id === storedPlan) {
                    radio.checked = true;
                    radio.closest('.bs-radio').classList.add('selected');
                }
            });
        }
        planRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                document.querySelectorAll('.bs-radio.typ-plan').forEach(el => el.classList.remove('selected'));
                this.closest('.bs-radio').classList.add('selected');
                TSA.buildingCostEst.setBuildingCostData({ architecturalPlan: this.value });
            });
        });
    },
    
    // Handle skipping material selection
    initMaterialSkip: function () {
        const materialSkipButton = document.querySelector(".materialSkip");
        const step4 = document.querySelector(".calc-step.step-4");
        const step5 = document.querySelector(".calc-step.step-5");
        const planSkipButton = document.querySelector(".planSkip");
        materialSkipButton.addEventListener("click", (event) => {
            event.preventDefault();
            TSA.buildingCostEst.setBuildingCostData({ selectedMaterial: "standard" });
            TSA.buildingCostEst.transitionToNextStep(step4, step5);
        });
        planSkipButton.addEventListener("click", (event) => {
            event.preventDefault();
            TSA.buildingCostEst.setBuildingCostData({ architecturalPlan: "" });
            window.location.href = "http://localhost:8000/calculator/calculator-result.html";
        });
    },
    
    // Transition to next step
    transitionToNextStep: function (current, next) {
        if (current && next) {
            current.classList.add("fade-out");
            setTimeout(() => {
                current.classList.add("hide");
                next.classList.remove("hide");
                next.classList.add("fade-in");
            }, 300);
        }
    },    
};


// Check if data is stored in localStorage
function checkStoredData() {
    try {
        const storedData = localStorage.getItem('buildingCost');
        console.log(storedData ? JSON.parse(storedData) : 'No data found in localStorage.');
    } catch (err) {
        console.error("Error checking stored data:", err);
    }
}

// Initialize the script when the document is ready
$(document).ready(function () {
    try {
        TSA.buildingCostEst.init();
        checkStoredData();
    } catch (err) {
        console.error("Error during document ready:", err);
    }
});