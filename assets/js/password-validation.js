// Function to validate password criteria
function validatePassword(password) {
    const criteria = {
        number: /\d/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        special: /[@#$%]/,
        length: /.{8,}/,
    };

    // Iterate over each criteria item and update its status
    document.querySelectorAll('.verify-item').forEach((item) => {
        const checkType = item.dataset.check;

        // Log the value of checkType to debug
        console.log(`Validating: ${checkType}`);

        // Check if the checkType exists in the criteria object
        if (criteria[checkType]) {
            if (criteria[checkType].test(password)) {
                item.classList.add('completed');
                item.classList.remove('error');
            } else {
                item.classList.remove('completed');
                item.classList.add('error');
            }
        } else {
            console.error(`No validation rule found for: ${checkType}`);
        }
    });
}

// Attach event listeners to password input
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function () {
    validatePassword(this.value);
});
passwordInput.addEventListener('focus', function () {
    validatePassword(this.value);  
});

// Handle "Get verification link" button click
document.getElementById('verify-password-btn').addEventListener('click', function () {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password === confirmPassword) {
        alert('Password validated successfully!');
    } else {
        alert('Passwords do not match.');
    }
});
