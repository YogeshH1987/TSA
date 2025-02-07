$(function(){
    $(".result-wrap tr.view").on("click", function(){
      if($(this).hasClass("open")) {
        $(this).removeClass("open").next(".fold").removeClass("open");
      } else {
        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
        $(this).addClass("open").next(".fold").addClass("open");
      }
    });
  });

    // Get all the dropdowns
    const dropdowns = document.querySelectorAll('.select-dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownButton = dropdown.querySelector('.select-dropdown-button');
        const dropdownItems = dropdown.querySelectorAll('.select-dropdown-list-item');

        // Event listener for dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedValue = item.getAttribute('data-value');
                const selectedText = item.innerText;

                // Update the button text
                dropdownButton.querySelector('.select-text').innerText = selectedText;

                // Remove existing button class
                dropdownButton.classList.remove('btn-orange', 'btn-pink', 'btn-yellow');

                // Add new button class based on the selection
                if (selectedValue == 'economy') {
                    dropdownButton.classList.add('btn-pink');  // Economy price
                } else if (selectedValue == 'standard') {
                    dropdownButton.classList.add('btn-orange');  // Standard price
                } else if (selectedValue == 'premium') {
                    dropdownButton.classList.add('btn-yellow');  // Premium price
                }
            });
        });
    });