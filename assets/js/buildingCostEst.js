var TSA = TSA || {};

TSA.buildingCostEst = {
    currentStep: 1, // Start from the first step
    buildingCostLocal: {
        architecturalPlan : "",
        basement :true,
        builtUpArea: 200,
        currentStep: 1,
        numberFlr: 0,
        selectedMaterial: "standard",
        spaceRequirement: { livingroom: 0, kitchen: 0, bedroom: 0, bathroom: 0, balcony: 0,
            pujaroom: 0, dinningarea: 0, storageroom: 0, garage: 0,
            servantroom: 0, hall: 0, study: 0}
    },
    // Initialize function
    init: function () {
        try {
            this.getBuildingCostData();
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
        const data = JSON.parse(localStorage.getItem("buildingCost"));
        console.log('data', data)
        if(data !== null){
            this.buildingCostLocal.architecturalPlan= data.architecturalPlan;
            this.buildingCostLocal.basement = data.basement;
            this.buildingCostLocal.builtUpArea = data.builtUpArea;
            this.buildingCostLocal.currentStep = data.currentStep;
            this.buildingCostLocal.numberFlr = data.numberFlr;
            this.buildingCostLocal.selectedMaterial = data.selectedMaterial;
            this.buildingCostLocal.spaceRequirement.livingroom = data.spaceRequirement.livingroom;
            this.buildingCostLocal.spaceRequirement.kitchen = data.spaceRequirement.kitchen;
            this.buildingCostLocal.spaceRequirement.bedroom = data.spaceRequirement.bedroom;
            this.buildingCostLocal.spaceRequirement.bathroom = data.spaceRequirement.bathroom;
            this.buildingCostLocal.spaceRequirement.balcony = data.spaceRequirement.balcony;
            this.buildingCostLocal.spaceRequirement.pujaroom = data.spaceRequirement.pujaroom;
            this.buildingCostLocal.spaceRequirement.dinningarea = data.spaceRequirement.dinningarea;
            this.buildingCostLocal.spaceRequirement.storageroom = data.spaceRequirement.storageroom;
            this.buildingCostLocal.spaceRequirement.garage = data.spaceRequirement.garage;
            this.buildingCostLocal.spaceRequirement.servantroom = data.spaceRequirement.servantroom;
            this.buildingCostLocal.spaceRequirement.hall = data.spaceRequirement.hall;
            this.buildingCostLocal.spaceRequirement.study = data.spaceRequirement.study;            
        }
        console.log('buildingCostLocal', this.buildingCostLocal);
    },

    setBuildingCostData: function (updatedData) {
        localStorage.setItem("buildingCost", JSON.stringify(updatedData));
    },

    // Store values in local object and update localStorage
    updateBuildingCostLocal: function (updatedData) {
        console.log('updatedData',updatedData)
        this.buildingCostLocal = { ...this.buildingCostLocal, ...updatedData };
        this.setBuildingCostData(this.buildingCostLocal);
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
                    start: this.buildingCostLocal.builtUpArea || 200,
                    connect: [true, false],
                    range: { min: 200, max: 4000 },
                    step: 100
                });

                builtUpAreaSlider.noUiSlider.on('update', (values, handle) => {
                    console.log('updateBuildingCostLocal builtUpAreaSlider', values)
                    const sqFtValue = Math.round(values[handle]);
                    document.getElementById('builtUpAreaValue').value = `${sqFtValue} Sq.ft`;
                    this.updateBuildingCostLocal({ builtUpArea: sqFtValue });
                    houseAnimation.goToAndStop((sqFtValue - 200) / (4000 - 200) * 768, true);
                });
            }

            if (numberFlrSlider) {
                noUiSlider.create(numberFlrSlider, {
                    start: this.buildingCostLocal.numberFlr || 0,
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
                    console.log('updateBuildingCostLocal floor', values)

                    const floor = Math.round(values[handle]);
                    this.updateBuildingCostLocal({ numberFlr: floor });
                    const frameMapping = {
                        0: 0,
                        1: 50,
                        2: 100,
                        3: 150,
                        4: 200,
                        5: 250,
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
        let currentStep = this.buildingCostLocal.currentStep || 1;
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
            if (currentStep === 1) {
                progressBar.classList.add('hide');
                actWrap.classList.add('hide');
            }
            if (currentStep > 1) {
                actWrap.classList.remove('hide');
                progressBar.classList.remove('hide');
                $('.cp-building-estimator').removeClass('full-width');
            }
            if (currentStep === 6) {
                btn.classList.add('js-last');
            }  
        }

        step1Btn.forEach(btn => btn.addEventListener('click', () => {
            currentStep = 2;
            showStep(currentStep);            
            this.updateBuildingCostLocal({ currentStep });
        }));

        nextBtns.forEach(btn => btn.addEventListener('click', () => {
            if (currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
                // actWrap.classList.remove('hide');
                // if (currentStep === 2) progressBar.classList.remove('hide');
                // if (currentStep === 6) {
                //     btn.classList.add('js-last');
                // }                
            }
            this.updateBuildingCostLocal({ currentStep });
        }));

        backBtns.forEach(btn => btn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
                
            }
            this.updateBuildingCostLocal({ currentStep });
        }));

        showStep(currentStep);
    },

    initSpaceRequirementCounters: function () {
        let spaceRequirement = this.buildingCostLocal.spaceRequirement || {};
        const minCount = 0;
        const maxCount = 5;

        $(".cp-counter").each(function () {
            const counter = $(this);
            counter.find(".number-product").val(spaceRequirement[counter.data('room-type')]);

            counter.find(".btn-plus").click(function (e) {
                const input = counter.find(".number-product");
                let value = parseInt(input.val()) || minCount;
                const roomType = counter.data('room-type');
                spaceRequirement[roomType] = Math.min(value + 1, maxCount);
                input.val(spaceRequirement[roomType]);
                TSA.buildingCostEst.updateBuildingCostLocal({ spaceRequirement });
            });

            counter.find(".btn-minus").click(function (e) {
                const input = counter.find(".number-product");
                let value = parseInt(input.val()) || minCount;
                const roomType = counter.data('room-type');
                spaceRequirement[roomType] = Math.max(value - 1, minCount);
                input.val(spaceRequirement[roomType]);
                TSA.buildingCostEst.updateBuildingCostLocal({ spaceRequirement });
            });

            counter.find(".number-product").on("input", function (e) {
                const input = $(this);
                let value = parseInt(input.val()) || minCount;
                const roomType = counter.data('room-type');
                spaceRequirement[roomType] = Math.min(Math.max(value, minCount), maxCount);
                input.val(spaceRequirement[roomType]);
                TSA.buildingCostEst.updateBuildingCostLocal({ spaceRequirement });
            });
        });
    },

    // Initialize material selection
    initMaterialSelection: function () {
        const materialRadios = document.querySelectorAll('input[name="material"]');
        let storedMaterial = this.buildingCostLocal.selectedMaterial;
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
                TSA.buildingCostEst.updateBuildingCostLocal({ selectedMaterial: this.value });
            });
        });
    },
    
    // Initialize basement toggle
    initBasement: function () {
        const basementSwitch = document.getElementById('switch-rounded');
        if (this.buildingCostLocal.basement) {
            basementSwitch.checked = this.buildingCostLocal.basement;
        }
        basementSwitch.addEventListener('change', function () {
            TSA.buildingCostEst.updateBuildingCostLocal({ basement: this.checked });
        });
    },
    
      // Initialize plan selection
      initPlanSelection: function () {
        const planRadios = document.querySelectorAll('input[name="plan"]');
        let storedPlan = this.buildingCostLocal.architecturalPlan;
        if (storedPlan) {
            planRadios.forEach(radio => {
                if (radio.value === storedPlan) {
                    radio.checked = true;
                    radio.closest('.bs-radio').classList.add('selected');
                }
            });
        }
        planRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                document.querySelectorAll('.bs-radio.typ-plan').forEach(el => el.classList.remove('selected'));
                this.closest('.bs-radio').classList.add('selected');
                TSA.buildingCostEst.updateBuildingCostLocal({ architecturalPlan: this.value });
            });
        });
    },

    // Handle architectural plan selection and proceed to the next step
    handleArchitecturalPlanSelection: function () {
        const nextButton = document.querySelectorAll(".js-last");
        nextButton.addEventListener("click", function () {
            let selectedPlan = this.buildingCostLocal.architecturalPlan;
            if (selectedPlan) {
                TSA.buildingCostEst.updateBuildingCostLocal({ architecturalPlan: selectedPlan });
                window.location.href = "http://localhost:8000/calculator/calculator-result.html";
            } else {
                alert("Please select an architectural plan before proceeding.");
            }
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
            TSA.buildingCostEst.updateBuildingCostLocal({ selectedMaterial: "standard" });
            TSA.buildingCostEst.transitionToNextStep(step4, step5);
        });
        planSkipButton.addEventListener("click", (event) => {
            event.preventDefault();
            TSA.buildingCostEst.updateBuildingCostLocal({ architecturalPlan: "" });
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