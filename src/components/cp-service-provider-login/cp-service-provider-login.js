$(document).ready(function () {
    // Call functions on document ready
    initAddServiceButton();
    initWorkingDaysDropdown();
    initRadioButtons();
});

// Function to handle the 'Add Service' button functionality
function initAddServiceButton() {
    const addServiceButton = document.getElementById("add-service");

    // Check if the 'add-service' button exists before adding event listener
    if (addServiceButton) {
        addServiceButton.addEventListener("click", function() {
            const servicesContainer = document.getElementById("services-container");
            const currentInputs = servicesContainer.querySelectorAll("input");
            
            // Only allow adding up to 3 inputs
            if (currentInputs.length < 3) {
                const newInput = document.createElement("input");
                newInput.type = "text";
                newInput.classList.add("form-input", "validate-mobile");
                newInput.placeholder = "Enter text";
                newInput.required = true;
                servicesContainer.appendChild(newInput);
            } else {
                alert("You can only add up to 3 services.");
            }
        });
    } else {
        console.error("Error: 'add-service' button not found.");
    }
}

// Function to initialize the working days dropdown behavior
function initWorkingDaysDropdown() {
    const weekDaysDiv = document.querySelector('.week-days');
    const allDaysOption = document.querySelector('.select-dropdown-list-item[data-value="all-days"]');
    const customDaysOption = document.querySelector('.select-dropdown-list-item[data-value="custom-days"]');

    // Ensure elements exist before adding event listeners
    if (allDaysOption && weekDaysDiv) {
        allDaysOption.addEventListener('click', function() {
            weekDaysDiv.classList.add('hide');  // Hide the week days section
        });
    } else {
        console.error("Error: 'all-days' option or 'week-days' div not found.");
    }

    if (customDaysOption && weekDaysDiv) {
        customDaysOption.addEventListener('click', function() {
            weekDaysDiv.classList.remove('hide');  // Show the week days section
        });
    } else {
        console.error("Error: 'custom-days' option or 'week-days' div not found.");
    }
}

// Function to handle radio button behavior (Organisation vs Individual)
function initRadioButtons() {
    // When the 'Organisation' radio button is selected
    $('#bTyp2').change(function () {
        if ($(this).prop('checked')) {
            // Show the organisation section and hide the "Individual" section
            $('.typ-organisation').removeClass('hide').addClass('show');
        }
    });

    // When the 'Individual' radio button is selected
    $('#bTyp1').change(function () {
        if ($(this).prop('checked')) {
            // Hide the organisation section
            $('.typ-organisation').removeClass('show').addClass('hide');
        }
    });

    // When the "Others" radio button is clicked
    $('#services7').change(function () {
        if ($(this).prop('checked')) {
            $('.other-services').removeClass('hide'); // Show the div
        }
    });

    // When any other radio button is clicked
    $('input[name="services"]:not(#services7)').change(function () {
        $('.other-services').addClass('hide'); // Hide the div
    });
}
