$(document).ready(function() {

    $(document).on("focusout", ".bs-form .form-field", function() {
        if ($(this).val() != "") {
            $(this).addClass("has-content");
        } else {
            $(this).removeClass("has-content");
        }
    });

    // select fiedd
    // $(".select-without-search .bs-select").select2({
    //     minimumResultsForSearch: -1,
    // });

    // $(".select-with-sear/ch .bs-select").select2();

    $(".bs-select").each(function(index) {
        var thisSelect = $(this);
        if ($(this).val() == '') {
            thisSelect.parents(".form-group").find(".select2-selection__rendered").text('');
        }
    });

    $(document).on("select2:open", () => {
        document.querySelector(".select2-search__field").focus();
        $(".select2-container--open").find(".select2-selection__rendered").hide();
    });

    $(document).on("select2:close", () => {
        $(".select2-selection__rendered").show();
    });

    $(document).on("change", ".bs-select", function() {
        if ($(this).val() != "") {
            $(this).removeClass("has-content");

        } else {
            $(this).addClass("has-content");
        }
    });

    // input[type="file"]
    $(document).on("click", ".bs-form .btn-file-trigger", function(e) {
        var fileInput = $(this).siblings('input[type="file"]');
        e.stopImmediatePropagation();
        fileInput.trigger("click");
        // $(this).siblings('input[type="text"]').trigger("focus");
        $(this).parents().find('.form-field-upload').addClass('has-content');
        document.body.onfocus = focusOut;
    });
    // $(document).on("focusout", ".bs-form .btn-file-trigger", function(e) {

    //     $(this).parents().find('.form-field-upload').removeClass('has-content');
    // });

    $(".form-field-upload").change(function() {
        readName(this, $(this));
    });

    function readName(input, thisObj) {
        if (input.value.length) {
            var size = input.files[0].size;
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

            const i = Math.floor(Math.log(size) / Math.log(k));
            var file_name = input.files[0].name;
            var file_size = (size / Math.pow(k, i)).toFixed(2) + " " + sizes[i];

            var fileSizeAllowed = 5 * k;
            var kbSize = size / k;
            kbSize = Math.round(kbSize * 100) / 100;

            if (input.files && input.files[0] && kbSize <= fileSizeAllowed) {
                // console.log(input, thisObj, file_name, file_size);
                thisObj.siblings('input[type="text"]').val(file_name);
            } else {
                thisObj.val('');
            }
        }
    }

    function focusOut() {
        setTimeout(function() {
            // console.log($(".form-field-invoice").val());
            if ($(".form-field-upload").val() == "") {
                $(".form-field-upload").parents('.form-group').addClass('error');
                $(".form-field-upload").parents('.form-group').find('.field-desc').css('color', '#bd001c');
                $(".form-field-upload").siblings('input[type="text"]').trigger("focusout");
                $(".form-field-upload").siblings('input[type="text"]').val("");
            } else {
                $(".form-field-upload").parents('.form-group').removeClass('error');
                $(".form-field-upload").parents('.form-group').find('.field-desc').css('color', '#999');
                $(".form-field-upload").siblings('input[type="text"]').trigger("focus");
            }

            document.body.onfocus = null;
        }, 700);
    }

    // date field
    // $(".date-picker").datepicker({ dateFormat: 'dd, MM, yy' });
    // $(document).on("blur", ".date-picker", function() {
    //     var valdate = $(".date-picker").datepicker().val();
    //     // alert(valdate)
    //     if (valdate != "") {
    //         $(this).removeClass("has-content");

    //     } else {
    //         $(this).addClass("has-content");
    //     }
    // });

    $(document).on("click", ".trigger-date", function(e) {
        $(this).siblings('input').trigger("focus");
    });

    // validations
    $(document).on("focusout", ".validate-field", function () {
        var field_container = $(this).parents(".otp-wrap");
    
        // Check if the field is empty
        if (!$(this).val()) {
            field_container.addClass('error'); // Add error class
            field_container.find('.error-msg').html('Please fill out this field.').show(); // Show error message
        } else {
            field_container.removeClass('error'); // Remove error class
            field_container.find('.error-msg').html('').hide(); // Hide error message
        }
    });
    

    $(document).on("focusout", ".validate-name", function() {
        var field_container = $(this).parents(".form-group");
        var regex = /^[a-zA-Z]+(\s?[a-zA-Z-']+)*$/gi;

        if (!regex.test($(this).val())) {
            field_container.addClass('error');
            field_container.find('.error-msg').html('Please enter valid Name.').show();
        } else {
            field_container.removeClass('error');
            field_container.find('.error-msg').html('').hide();
        }
    });

    $(document).on("focusout", ".validate-mobile", function() {
        var field_container = $(this).parents(".form-group");
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
        var regex = /^[56789]\d{9}$/;

        if (!regex.test($(this).val())) {
            field_container.addClass('error');
            field_container.find('.error-msg').html('Please enter valid Mobile Number.').show();
        } else {
            field_container.removeClass('error');
            field_container.find('.error-msg').html('').hide();
        }
    });

    $(document).on("focusout", ".validate-email", function() {
        var field_container = $(this).parents(".form-group");
        var regex = /^[0-9\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!regex.test($(this).val())) {
            field_container.addClass('error');
            field_container.find('.error-msg').html('Please enter valid Email Id.').show();
        } else {
            field_container.removeClass('error');
            field_container.find('.error-msg').html('').hide();
        }
    });

    $(document).on("focusout", ".validate-chassis", function() {
        var field_container = $(this).parents(".form-group");
        var regex = /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{3}\d{5}$/;
        // e.g. 1ftfw1et4bfc45903

        if (!regex.test($(this).val())) {
            field_container.addClass('error');
            field_container.find('.error-msg').html('Please enter valid Chassis No.').show();
        } else {
            field_container.removeClass('error');
            field_container.find('.error-msg').html('').hide();
        }
    });

    $(document).on("click", ".submit-button", function() {
        $("#form-field-name").trigger('focusout');
        $("#form-field-mobile").trigger("focusout");
        $("#form-field-email").trigger("focusout");
        // focusOut();
    });

 
  
});




