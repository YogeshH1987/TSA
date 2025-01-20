// code for otp inputs start

const inputs = document.querySelectorAll(".otp-wrap input"),
button = document.getElementById("btn_otp_verify");
// iterate over all inputs
inputs.forEach((input, index1) => {
input.addEventListener("keyup", (e) => {
  // This code gets the current input element and stores it in the currentInput variable
  // This code gets the next sibling element of the current input element and stores it in the nextInput variable
  // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
  const currentInput = input,
    nextInput = input.nextElementSibling,
    prevInput = input.previousElementSibling;

  // if the value has more than one character then clear it
  if (currentInput.value.length > 1) {
    currentInput.value = "";
    return;
  }

  // if the next input is disabled and the current value is not empty
  //  enable the next input and focus on it
  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
    nextInput.removeAttribute("disabled");
    nextInput.focus();
  }

  // if the backspace key is pressed
  if (e.key === "Backspace") {
    // iterate over all inputs again
    inputs.forEach((input, index2) => {
      // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
      // and the previous element exists, set the disabled attribute on the input and focus on the previous element
      if (index1 <= index2 && prevInput) {
        input.setAttribute("disabled", true);
        input.value = "";
        prevInput.focus();
      }
    });
  }
  //if the fourth input( which index number is 3) is not empty and has not disable attribute then
  //remove btn-disable class and attribute disable to "true" if not then remove the same class and attribute.
  if (!inputs[4].disabled && inputs[4].value !== "") {
    // button.classList.add("active");
    button.classList.remove("btn-disable");
    button.setAttribute("disabled", false);
    return;
  }

    //   button.classList.remove("active");
    button.classList.add("btn-disable");
    button.setAttribute("disabled", true);
});
});

window.addEventListener("load", () => {
  //focus the first input which index is 0 on window load
  inputs[0].focus();
  startResendTimer();
});

// code for otp inputs ends

// code for otp timer start
let timer;
let countdown = 60; // Set the countdown duration in seconds

function startResendTimer() {
    // Disable the button during the countdown
    document.getElementById('btn_otp_resend').disabled = true;

    // Start the countdown
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.querySelectorAll('.otp-timer');
    console.log(timerElement.innerHtml, countdown, "update")
    if (countdown > 0) {
        timerElement[0].innerText = `00:${countdown}`;
        countdown--;
    } else {
      timerElement[0].innerText = countdown;

        // Enable the button when the countdown reaches zero
        document.getElementById('btn_otp_resend').disabled = false;
        timerElement[0].textContent = '';
        
        // Reset countdown for the next attempt
        countdown = 60;
        
        // Stop the timer
        clearInterval(timer);
    }
}
// code for otp timer ends
