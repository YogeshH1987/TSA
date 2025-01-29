const dots = document.querySelectorAll('.dot');  // Select all dots

dots.forEach(dot => {
    // For hover (desktop devices)
    dot.addEventListener('mouseover', () => {
        dot.classList.add('open');  // Add 'open' class when mouse is over
    });

    dot.addEventListener('mouseleave', () => {
        dot.classList.remove('open');  // Remove 'open' class when mouse leaves
    });

    // For click (mobile devices)
    dot.addEventListener('click', () => {
        dot.classList.toggle('open');  // Toggle 'open' class on click for mobile
    });
});