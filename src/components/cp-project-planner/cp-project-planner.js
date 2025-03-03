$(document).ready(function() {
    // addedFavorite();
    projectPlannerSlider();
});

$(window).resize(function() {
    projectPlannerSlider();
});


function projectPlannerSlider() {
    var swiper = new Swiper(".js-project-planner", {
        slidesPerView: 1,
        spaceBetween: 32,
        loop: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
  
        breakpoints: {
            // when window width is <= 499px
            768: {
                slidesPerView: 1,
                spaceBetweenSlides: 0,
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 4,
                spaceBetweenSlides: 32,
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const closeIcon = document.querySelector(".stage-steps-wrap .icon");
    const stageStepsWrap = document.querySelector(".stage-steps-wrap");

    if (closeIcon && stageStepsWrap) {
        closeIcon.addEventListener("click", function () {
            stageStepsWrap.style.display = "none";
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleLink = document.querySelector(".total-spent .link");
    const detailWrap = document.querySelector(".detail-wrap");

    toggleLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent page jump

        if (detailWrap.style.display === "none") {
            detailWrap.style.display = "block";
            toggleLink.textContent = "Less details";
        } else {
            detailWrap.style.display = "none";
            toggleLink.textContent = "More details";
        }
    });
});


// document.querySelectorAll('#upload, #upload-img').forEach(input => {
//     input.addEventListener('change', function(event) {
//         let imgPreview = document.getElementById('img-preview');
//         let uploadFileArea = document.querySelector('.upload-file-area');
//         let fileUpload = document.querySelector('.file-upload');

//         if (event.target.files.length > 0) {
//             uploadFileArea.style.display = 'none'; // Hide upload area
//             fileUpload.style.display = 'block'; // Hide file upload button
//         } else {
//             uploadFileArea.style.display = 'block'; // Show upload area
//             fileUpload.style.display = 'none'; // Show file upload button
//         }

//         Array.from(event.target.files).forEach(file => {
//             if (file.type.startsWith('image/')) {
//                 let reader = new FileReader();

//                 reader.onload = function(e) {
//                     let imgWrapper = document.createElement('div');
//                     imgWrapper.classList.add('wrapper-thumb');

//                     let img = document.createElement('img');
//                     img.src = e.target.result;
//                     img.classList.add('img-preview-thumb');

//                     imgWrapper.appendChild(img);
//                     imgPreview.appendChild(imgWrapper);
//                 };

//                 reader.readAsDataURL(file);
//             }
//         });
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".check-head-right .icon-down-arrow").forEach(icon => {
        icon.addEventListener("click", function () {
            let checklist = this.closest(".check-list-wrap").querySelector(".check-list");
            checklist.classList.toggle("hide");
            this.classList.toggle("rotated"); // Toggle rotation class
        });
    });
});

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
