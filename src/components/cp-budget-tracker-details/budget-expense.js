$(document).ready(function () {
    $("#start-date").datepicker({
        dateFormat: "dd-mm-yy",
    });
    
});

document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumb");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            mainImage.src = this.src;
        });
    });
});