

var imgUpload = document.getElementById('upload-img'),
    imgPreview = document.getElementById('img-preview'),
    imgUploadForm = document.getElementById('form-upload'),
    totalFiles,
    previewTitle,
    previewTitleText,
    img,
    attachSupportingBtn = document.getElementById('attach-supporting-btn'),
    cancelBtn = document.getElementById('cancel-btn'), // Cancel button
    uploadSupportingFilesDiv = document.getElementById('upload-supporting-files');
requestFormDiv = document.querySelector('.request-form'),

    // Event listener for the "Submit request" button to toggle visibility
    attachSupportingBtn.addEventListener('click', function () {
        // Hide the request-form div
        requestFormDiv.style.display = 'none';

        // Show the upload-supporting-files div
        uploadSupportingFilesDiv.style.display = 'block';
    });
// Event listener for the "Cancel" button to toggle visibility
cancelBtn.addEventListener('click', function () {
    // Hide the upload-supporting-files div
    uploadSupportingFilesDiv.style.display = 'none';

    // Show the request-form div
    requestFormDiv.style.display = 'block';
    imgPreview.innerHTML = '';  // Clears all image preview thumbnails
});

// Event listener for the "Save" button to toggle visibility and show uploaded file names
document.getElementById('save-btn').addEventListener('click', function () {
    // Hide the upload-supporting-files div
    uploadSupportingFilesDiv.style.display = 'none';

    // Show the request-form div
    requestFormDiv.style.display = 'block';

    // Show the attachments section
    const attachmentList = document.querySelector('.typ-attachements');
    attachmentList.classList.remove('hidden');

    // Get the uploaded files from the file input
    const files = imgUpload.files;

    // Clear the previous list (if any)
    const attachmentUl = document.querySelector('.attachment-list');
    attachmentUl.innerHTML = '';

    // Loop through each file and add it to the attachment list
    for (let i = 0; i < files.length; i++) {
        // Create a new list item for each file
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        
        // Add the file name to the list item
        listItem.textContent = files[i].name;

        // Optionally, add a remove button to each file in the list
        const removeButton = document.createElement('span');
        removeButton.classList.add('icon-wrap');
        const icon = document.createElement('i');
        icon.classList.add('icon', 'icon-delate');
        var deleteSpanText = document.createElement("span");
        deleteSpanText.textContent = 'Remove';
        removeButton.appendChild(icon);
        removeButton.appendChild(deleteSpanText);
        // removeButton.appendChild(document.createTextNode(' Remove'));

        // Append the remove button to the list item
        listItem.appendChild(removeButton);
        // Append the list item to the attachment list
        attachmentUl.appendChild(listItem);

        // Add event listener to remove the file from the list when the remove button is clicked
        removeButton.addEventListener('click', function () {
            listItem.remove(); // Remove the list item from the list
        });
    }
});

imgUpload.addEventListener('change', previewImgs, true);

function previewImgs(event) {
    totalFiles = imgUpload.files.length;

    if (!!totalFiles) {
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