var sheet = document.createElement('style');
var rangeInput = document.querySelectorAll('.range input');
var prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {
  var curVal = el.value;
  var val = ((curVal - 1) / (el.max - 1)) * 100; // Calculate percentage
  var style = '';

  // Set active label
  var rangeLabels = document.querySelectorAll('.range-labels li');
  rangeLabels.forEach(function (label) {
    label.classList.remove('active', 'selected');
  });

  var curLabel = document.querySelector('.range-labels li:nth-child(' + curVal + ')');
  if (curLabel) {
    curLabel.classList.add('active', 'selected');
    var prevLabels = Array.from(curLabel.parentElement.children).slice(0, curVal - 1);
    prevLabels.forEach(function (label) {
      label.classList.add('selected');
    });
  }

  // Change background gradient
  for (var i = 0; i < prefs.length; i++) {
    style += `.range {background: linear-gradient(to right, #670015 0%, #D2042D ${val}%, #fff ${val}%, #fff 100%) !important}`;
    style += `.range input::-` + prefs[i] + `{background: linear-gradient(to right, #670015 0%, #D2042D ${val}%, #DEDEDE ${val}%, #b2b2b2 100%)!important}`;
  }

  return style;
};

rangeInput.forEach(function (input) {
  input.addEventListener('input', function () {
    sheet.textContent = getTrackStyle(this);
  });

  // Initialize style on page load
  sheet.textContent = getTrackStyle(input);
});

// Change input value on label click
var rangeLabels = document.querySelectorAll('.range-labels li');
rangeLabels.forEach(function (label, index) {
  label.addEventListener('click', function () {
    rangeInput.forEach(function (input) {
      input.value = index + 1;
      input.dispatchEvent(new Event('input'));
    });
  });
});
