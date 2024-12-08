var winWidth = $(window).width();

$(document).ready(function () {
  productCount();
});

$(window).resize(function() {
  productCount()
});

const minCount = 1; // Minimum counter value
 const maxCount = 100; // Maximum counter value (optional)

function productCount() {
  $(".cp-counter").each(function () {
    const counter = $(this); // Scope to the specific counter element

    // Increment button
    counter.find(".btn-plus").click(function () {
      const input = counter.find(".number-product");
      let value = parseInt(input.val());
      value = isNaN(value) ? minCount : value + 1;

      if (value <= maxCount) {
        input.val(value);
        counter.find(".btn-minus").removeAttr("disabled");
      }
    });

    // Decrement button
    counter.find(".btn-minus").click(function () {
      const input = counter.find(".number-product");
      let value = parseInt(input.val());
      value = isNaN(value) ? minCount : value - 1;

      if (value >= minCount) {
        input.val(value);
        if (value === minCount) {
          $(this).attr("disabled", "disabled");
        }
      }
    });

    // Editable input
    counter.find(".number-product").on("input", function () {
      const input = $(this);
      let value = parseInt(input.val());

      if (isNaN(value) || value < minCount) {
        value = minCount;
      } else if (value > maxCount) {
        value = maxCount;
      }

      input.val(value);
      counter.find(".btn-minus").attr("disabled", value <= minCount);
    });
  });
}
