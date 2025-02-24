document.addEventListener("DOMContentLoaded", function () {
    const quizItems = document.querySelectorAll(".category-img");

    quizItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove "selected" class from all items
            quizItems.forEach(q => q.classList.remove("selected"));

            // Hide "selected-text" for all items
            quizItems.forEach(q => {
                const selectedText = q.querySelector(".selected-text");
                if (selectedText) selectedText.style.display = "none";
            });

            // Add "selected" class to the clicked item
            this.classList.add("selected");

            // Show "selected-text" for the clicked item
            const selectedText = this.querySelector(".selected-text");
            if (selectedText) selectedText.style.display = "flex";
        });
    });
});

function previewImage(event) {
    let input = event.target;
    let listItem = input.closest(".add-category-list"); // Get the parent <li>
    let previewContainer = listItem.querySelector(".preview-container"); // Find the correct preview container
    let fileArea = listItem.querySelector(".cp-attached-file"); // Find the upload area

    // Remove upload area when an image is uploaded
    if (fileArea) {
        fileArea.remove();
    }

    // Clear previous image
    previewContainer.innerHTML = "";

    let file = input.files[0]; // Get only the first file
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("preview-image");
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".add-category-list");
    const tabContents = document.querySelectorAll(".tab-content");

    categoryItems.forEach(item => {
        item.addEventListener("click", function () {
            // Remove 'active' class from all category items
            categoryItems.forEach(cat => cat.classList.remove("active"));
            this.classList.add("active");

            // Get the target tab content
            const targetTab = this.getAttribute("data-target");

            // Hide all tab contents
            tabContents.forEach(tab => tab.style.display = "none");

            // Show the selected tab content
            const activeTab = document.querySelector(targetTab);
            if (activeTab) {
                activeTab.style.display = "block";
            }
        });
    });

    // Show the first tab by default
    document.querySelector(".add-category-list.active")?.click();
});


document.addEventListener("DOMContentLoaded", function () {
    const categoryItems = document.querySelectorAll(".add-category-list");
    const indicatorsContainer = document.querySelector(".category-list-indicators");

    function updateIndicators() {
        indicatorsContainer.innerHTML = ""; // Clear existing indicators

        categoryItems.forEach((item, index) => {
            let dot = document.createElement("span");
            dot.classList.add("dot");

            // Fill all previous dots up to the active category
            if (item.classList.contains("active") || [...categoryItems].indexOf(document.querySelector(".add-category-list.active")) >= index) {
                dot.classList.add("active"); // Filled class for styling
            }

            indicatorsContainer.appendChild(dot);

            // Add click event to jump to the category
            dot.addEventListener("click", function () {
                categoryItems[index].click();
            });
        });
    }

    // Update indicators when a category is clicked
    categoryItems.forEach(item => {
        item.addEventListener("click", function () {
            categoryItems.forEach(cat => cat.classList.remove("active"));
            this.classList.add("active");
            updateIndicators();
        });
    });

    // Initialize indicators
    updateIndicators();
});