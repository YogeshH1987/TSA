
document.getElementById("upload-img").addEventListener("change", function (event) {
    const imgPreview = document.getElementById("img-preview");
    
    // Prevent adding more than 5 images
    if (imgPreview.children.length + event.target.files.length > 5) {
        alert("You can upload a maximum of 5 images.");
        return;
    }

    Array.from(event.target.files).forEach((file) => {
        if (!file.type.startsWith("image/")) {
            alert("Only image files (PNG, JPEG) are allowed.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("File size should not exceed 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const wrapperThumb = document.createElement("div");
            wrapperThumb.classList.add("wrapper-thumb");

            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("img-preview-thumb");

            const removeBtn = document.createElement("span");
            removeBtn.classList.add("remove-btn");
            removeBtn.innerHTML = '<i class="icon icon-delate"></i><span>Delete</span>';
            
            // Remove image on click
            removeBtn.addEventListener("click", function () {
                wrapperThumb.remove();
            });

            wrapperThumb.appendChild(img);
            wrapperThumb.appendChild(removeBtn);
            imgPreview.appendChild(wrapperThumb);
        };
        reader.readAsDataURL(file);
    });
});
