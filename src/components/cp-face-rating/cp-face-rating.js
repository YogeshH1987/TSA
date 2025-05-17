$(document).ready(function () {
    ratingFunction();
});

function ratingFunction() {
  // Get all qnans-wrap elements
  const $questionWraps = $('.qnans-wrap');
  const $nextButton = $('.btn-wrap .btn');
  let currentQuestionIndex = 0;
  let ratings = []; // Array to store ratings

  // Ensure only the first question is visible
  $questionWraps.hide().first().show().removeClass('hide');

  // Update progress bar
  function updateProgressBar() {
      $('.progress-bar .progress-item').each(function (index) {
          $(this).toggleClass('complete', index <= currentQuestionIndex);
      });
      $('.steps').text(`${currentQuestionIndex + 1}/${$questionWraps.length}`);
  }

  // Handle radio button selection
  $('.qnans-wrap .bs-radio input[type="radio"]').on('change', function () {
      const $questionWrap = $(this).closest('.qnans-wrap');
      const questionIndex = $questionWraps.index($questionWrap);
      const rating = $(this).attr('id').split('_')[0].replace('face', ''); // Extract rating (e.g., face1_q1 -> 1)
      ratings[questionIndex] = rating; // Store the rating
      $nextButton.prop('disabled', false); // Enable Next button for current question
  });

  // Handle Next button click
  $nextButton.on('click', function () {
      // Only proceed if a rating is selected for the current question
      if (ratings[currentQuestionIndex]) {
          if (currentQuestionIndex < $questionWraps.length - 1) {
              $questionWraps.eq(currentQuestionIndex).hide().addClass('hide');
              currentQuestionIndex++;
              $questionWraps.eq(currentQuestionIndex).show().removeClass('hide');
              updateProgressBar();
              // Disable Next button if no rating is selected for the new question
              $nextButton.prop('disabled', !ratings[currentQuestionIndex]);
          } else {
              console.log('All ratings:', ratings);
              alert('All questions answered! Ratings: ' + ratings.join(', '));
              // Optionally, submit ratings to a server
              // $.ajax({
              //     url: '/submit-ratings',
              //     method: 'POST',
              //     data: { ratings: ratings },
              //     success: function (response) {
              //         console.log('Ratings submitted:', response);
              //     },
              //     error: function (error) {
              //         console.error('Error submitting ratings:', error);
              //     }
              // });
          }
      }
  });

  // Initialize progress bar and button state
  updateProgressBar();
  // Disable Next button initially since no selection is made yet
  $nextButton.prop('disabled', true);
}