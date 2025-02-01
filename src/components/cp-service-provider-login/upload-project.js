var imgUpload = document.getElementById('upload-img')
  , imgPreview = document.getElementById('img-preview')
  , imgUploadForm = document.getElementById('form-upload')
  , totalFiles
  , previewTitle
  , previewTitleText
  , img;

imgUpload.addEventListener('change', previewImgs, true);

function previewImgs(event) {
  totalFiles = imgUpload.files.length;
  
     if(!!totalFiles) {
    imgPreview.classList.remove('img-thumbs-hidden');
  }
  
  for (var i = 0; i < totalFiles; i++) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('wrapper-thumb');

    var removeBtn = document.createElement("span");
    var deleteText = document.createElement("span");
    deleteText.textContent = 'Delete';  // Set the text for "Delete"
    var icon = document.createElement("i");
    icon.classList.add('icon', 'icon-delate');

    removeBtn.classList.add('remove-btn');
    removeBtn.appendChild(icon);
    removeBtn.appendChild(deleteText);

    img = document.createElement('img');
    img.src = URL.createObjectURL(event.target.files[i]);
    img.classList.add('img-preview-thumb');

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    imgPreview.appendChild(wrapper);

    // Remove image preview on click
    $('.remove-btn').click(function () {
        $(this).parent('.wrapper-thumb').remove();
    });
}
  
  
}