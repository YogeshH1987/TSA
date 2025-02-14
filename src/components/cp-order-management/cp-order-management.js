$(document).ready(function () {
    let otherReasonRadio = document.getElementById("reason4");
    let cpForm = document.querySelector(".cp-form");

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
    let confirmButton = document.getElementById("confirmBtn"); // Next / Back to My Orders button
    let cancelButton = document.getElementById("cancelBtn"); // Cancel button
    let currentStep = 0; // Start from the first step

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle("hide", index !== stepIndex);
        });

        if (stepIndex === steps.length - 1) {
            confirmButton.textContent = "Back to My Orders";
            cancelButton.style.display = "none"; 

            // Apply min-width: 100% only on mobile screens
            if (window.matchMedia("(max-width: 768px)").matches) {
                confirmButton.style.minWidth = "100%";
            }
        } else {
            confirmButton.textContent = "Next"; 
            cancelButton.style.display = "inline-block"; 

            // Reset button width
            confirmButton.style.minWidth = "";
        }
    }

    confirmButton.addEventListener("click", function () {
        if (currentStep < steps.length - 1) {
            currentStep++; 
            showStep(currentStep);
        } else {
            alert("Redirecting to My Orders...");
            window.location.href = "/my-orders"; 
        }
    });

    cancelButton.addEventListener("click", function () {
        alert("Cancellation process aborted.");
        location.reload(); 
    });

    // Initial state
    showStep(currentStep);
});
