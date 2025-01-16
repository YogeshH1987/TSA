

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");

    // Rotate the arrow icon based on the dropdown state
    var arrow = document.getElementById("arrow");
    
    // Toggle the rotation of the icon
    if (document.getElementById("myDropdown").classList.contains("show")) {
        arrow.style.transform = "rotate(180deg)"; // Rotate when open
    } else {
        arrow.style.transform = "rotate(0deg)"; // Reset to original when closed
    }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    var dropdown = document.getElementById("myDropdown");
    var arrow = document.getElementById("arrow");
  
    // Check if the click was outside the dropdown or button
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content') && !event.target.matches('.dropdown-icon')) {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
  
        // Reset the arrow to the default (down) position when clicking outside
        arrow.style.transform = "rotate(0deg)"; // Reset to down position
    }
}

// Close the dropdown when the close button is clicked
document.querySelector('.dropdown-icon.icon-close').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    var dropdown = document.getElementById("myDropdown");
    var arrow = document.getElementById("arrow");

    // Close the dropdown and reset the arrow
    dropdown.classList.remove('show');
    arrow.style.transform = "rotate(0deg)"; // Reset to down position
});

