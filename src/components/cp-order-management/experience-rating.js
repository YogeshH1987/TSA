document.addEventListener("DOMContentLoaded", function () {
    let currentTab = 0; // Start with the first tab
    const tabs = document.querySelectorAll(".tab");
    const steps = document.querySelectorAll(".step");
    const nextBtn = document.getElementById("nextBtn");
    const stepSec = document.querySelector(".step-sec"); // Get step-sec div

    function showTab(n) {
        tabs.forEach((tab, index) => {
            tab.style.display = index === n ? "block" : "none";
        });

        steps.forEach((step, index) => {
            if (index < n) {
                step.classList.add("finish");
            } else {
                step.classList.remove("finish");
            }
            step.classList.toggle("active", index === n);
        });

        // Hide step-sec on the last tab
        if (n === tabs.length - 1) {
            stepSec.style.display = "none";
        } else {
            stepSec.style.display = "block";
        }
    }

    nextBtn.addEventListener("click", function () {
        if (currentTab < tabs.length - 1) {
            currentTab++;
            showTab(currentTab);
        } else {
            alert("Survey completed! Thank you for your feedback.");
        }
    });

    showTab(currentTab);
});
