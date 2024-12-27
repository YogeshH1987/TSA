
var sheet = document.createElement('style');
var rangeInput = document.querySelectorAll('.range input');
var prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (el) {
  var curVal = el.value;
  var val = (curVal - 1) * 16.666666667;
  var style = '';

  // Set active label
  var rangeLabels = document.querySelectorAll('.range-labels li');
  rangeLabels.forEach(function (label) {
    label.classList.remove('active', 'selected');
  });

  var curLabel = document.querySelector('.range-labels li:nth-child(' + curVal + ')');

  curLabel.classList.add('active', 'selected');
  var prevLabels = Array.from(curLabel.previousElementSibling);
  prevLabels.forEach(function (label) {
    label.classList.add('selected');
  });

  // Change background gradient
  for (var i = 0; i < prefs.length; i++) {
    style += '.range {background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #fff ' + val + '%, #fff 100%)}';
    style += '.range input::-'+ prefs[i] + '{background: linear-gradient(to right, #37adbf 0%, #37adbf ' + val + '%, #b2b2b2 ' + val + '%, #b2b2b2 100%)}';
  }

  return style;
};

rangeInput.forEach(function (input) {
  input.addEventListener('input', function () {
    sheet.textContent = getTrackStyle(this);
  });
});

// Change input value on label click
var rangeLabels = document.querySelectorAll('.range-labels li');
rangeLabels.forEach(function (label) {
  label.addEventListener('click', function () {
    var index = Array.from(rangeLabels).indexOf(label);
    rangeInput.forEach(function (input) {
      input.value = index + 1;
      input.dispatchEvent(new Event('input'));
    });
  });
});