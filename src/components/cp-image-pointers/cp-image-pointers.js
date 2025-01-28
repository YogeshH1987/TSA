const dots = document.querySelectorAll('.dot');  // Select all dots

dots.forEach(dot => {
    dot.addEventListener('mouseover', () => {
        dot.classList.add('open');  // Add 'open' class when mouse is over
    });

    dot.addEventListener('mouseleave', () => {
        dot.classList.remove('open');  // Remove 'open' class when mouse leaves
    });
});