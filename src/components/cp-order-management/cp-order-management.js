$(document).ready(function () {
    let otherReasonRadio = document.getElementById("reason4");
    let cpForm = document.querySelector(".cp-form");

    // Get all radio buttons with name "reason"
    let reasonRadios = document.querySelectorAll('input[name="reason"]');

    reasonRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (otherReasonRadio.checked) {
                cpForm.classList.remove("hide");
            } else {
                cpForm.classList.add("hide");
            }
        });
    });

    let steps = document.querySelectorAll(".cp-order-management"); // Select all steps
    let confirmButton = document.getElementById("confirmBtn"); // Next button
    let cancelButton = document.getElementById("cancelBtn"); // Cancel button
    let currentStep = 0; // Start from the first step

    function showStep(stepIndex) {
        // Hide all steps
        steps.forEach((step, index) => {
            step.classList.toggle("hide", index !== stepIndex);
        });

        // Change button behavior on the last step
        if (stepIndex === steps.length - 1) {
            confirmButton.textContent = "Back to My Orders"; // Change button text
            cancelButton.style.display = "none"; // Hide cancel button
            
            // Apply min-width: 100% for mobile screens
            confirmButton.style.minWidth = "100%";
        } else {
            confirmButton.textContent = "Next"; // Reset button text
            cancelButton.style.display = "inline-block"; // Show cancel button
            
            // Reset button width
            confirmButton.style.minWidth = "";
        }
    }

    confirmButton.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++; // Move to the next step
            showStep(currentStep);
        } else {
            // Redirect or close the modal when clicking "Back to My Orders"
            alert("Redirecting to My Orders...");
            window.location.href = "/my-orders"; // Change URL as needed
        }
    });

    cancelButton.addEventListener("click", function () {
        alert("Cancellation process aborted.");
        location.reload(); // Reload the page to reset steps
    });

    // Initial state
    showStep(currentStep);
});
