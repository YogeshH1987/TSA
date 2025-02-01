var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    // Dynamically update step count
    var stepCountElement = document.querySelector(".steps-num");
    stepCountElement.textContent = "Step - " + (n + 1) + "/" + x.length;

    // Fix Previous/Next buttons
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "inline";  // Hide prev on the first tab
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (x.length - 1)) {
        // document.getElementById("nextBtn").innerHTML = "Set up my dashboard";
        document.getElementById("nextBtn").setAttribute("onclick", "submitForm()");
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
        document.getElementById("nextBtn").setAttribute("onclick", "nextPrev(1)");
    }

    // Update step indicators
    fixStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    var steps = document.getElementsByClassName("step");

    // When moving back (n == -1), remove finish class from the current step and make it active
    if (n == -1) {
        // Remove "finish" class from the current step
        steps[currentTab].classList.remove("finish");

        // Add "active" class to the previous step
        steps[currentTab].classList.add("active");
    }

    // Exit the function if any field in the current tab is invalid (only for moving forward)
    if (n == 1 && !validateForm()) return false;

    // Hide the current tab:
    x[currentTab].style.display = "none";

    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;

    // If you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("service-provider-login").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    // y = x[currentTab].getElementsByTagName("input");

    // A loop that checks every input field in the current tab:
    // for (i = 0; i < y.length; i++) {
    //     // If a field is empty...
    //     if (y[i].value == "") {
    //         // Add an "invalid" class to the field:
    //         y[i].className += " invalid";
    //         // Set the current valid status to false
    //         valid = false;
    //     }
    // }

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // Return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class from all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
        // Remove the "finish" class from the current step if we are going back
        // x[i].className = x[i].className.replace(" finish", "");
    }

    // ... and removes the "finish" class from the current step when going back:
    var currentStep = x[n];
    currentStep.className = currentStep.className.replace(" finish", "");

    // Add the "active" class to the current step:
    currentStep.className += " active";
}


function submitForm() {
    // Perform final validations or data processing here
    // alert("Form submitted successfully!");

    // Optionally submit the form
    window.location.href = "#";
}

