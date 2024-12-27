var winWidth = $(window).width();
var winHeight = $(window).height();

$(document).ready(function() {
    console.log('jQuery is working!');

    $('.model-open').on('click', function () {
        console.log('Modal open clicked!');
    });
    tabFunction();
    commonPopup();
    if ($('.js-bg').length != 0) {
        bgImg();
    };
    youtubePopup();
    tabInsideFunction();
});


$(window).resize(function(e) {
    winWidth = $(window).width();
    winHeight = $(window).height();
});

$(window).on('load', function(event) {
    // $('#loaderWrapper').hide();
});

$(window).on('scroll', function(event) {
});

function tabFunction() {
    $('.cp-tab').each(function () {
        const $tabContainer = $(this); // Reference to the current tab container
    
        // Hide all tab contents except the active one within the current tab container
        $tabContainer.find('.tab-content').hide();
        $tabContainer.find('.tab-content.active').show();
    
        // Tab click handler
        $tabContainer.find('.tab-item').off('click').on('click', function (e) {
            e.stopPropagation(); // Prevent propagation to parent handlers
            
            // Remove 'active' class from all tab items and contents within the current tab container
            $tabContainer.find('.tab-item').removeClass('active');
            $tabContainer.find('.tab-content').removeClass('active').fadeOut(200);
    
            // Add 'active' class to clicked tab and show corresponding content
            const target = $(this).data('target');
            $(this).addClass('active');
            $tabContainer.find(target).addClass('active').fadeIn(200);
        });
    });
}

function tabInsideFunction() {
    $('.cp-inside-tab').each(function () {
        const $tabContainer = $(this); // Reference to the current tab container
    
        // Hide all tab contents except the active one within the current tab container
        $tabContainer.find('.tab-content').hide();
        $tabContainer.find('.tab-content.active').show();
    
        // Tab click handler
        $tabContainer.find('.tab-item').off('click').on('click', function (e) {
            e.stopPropagation(); // Prevent propagation to parent handlers
            
            // Remove 'active' class from all tab items and contents within the current tab container
            $tabContainer.find('.tab-item').removeClass('active');
            $tabContainer.find('.tab-content').removeClass('active').fadeOut(200);
    
            // Add 'active' class to clicked tab and show corresponding content
            const target = $(this).data('target');
            $(this).addClass('active');
            $tabContainer.find(target).addClass('active').fadeIn(200);
        });
    });
}


function bgImg() {
    $('.js-bg').each(function() {
        var imgSrc = $(this).find('.bg-img img').attr('src');
        $(this).css({
            'background-image': 'url(' + imgSrc + ')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        });
    })
}

// modalPopup js start
function commonPopup() {
    // Open modal
   
    $('.model-open').on('click', function (e) {
        e.preventDefault();
        const modalId = $(this).data('modal-id');
        console.log('Modal ID:', modalId);
        $(modalId).addClass('modal-show');
        $('.cm-overlay').addClass('active');
    });

    // Close modal
    $('.js-close, .cm-overlay').on('click',function() {
        console.log('Close clicked');
        $('.bs-modal').removeClass('modal-show');
        $('.cm-overlay').removeClass('active');
    });
}


// modalPopup js end

// youtubePopup js start

function youtubePopup() {
    let modalCounter = 0; // This counter will create a unique ID for each modal

    // Handle modal open event for any button
    $(document).on('click', '.model-youtube-open[data-toggle="modal"]', function () {
        const videoUrl = $(this).attr('data-video-url'); // Get the video URL for the current modal
        modalCounter++; // Increment counter to generate a new unique modal ID

        const modalId = `testi-video-${modalCounter}`; // Generate dynamic modal ID
        const videoContainerId = `video-embed-container-${modalCounter}`; // Generate dynamic video container ID

        // Create modal dynamically
        const modalHtml = `
            <div id="${modalId}" tabindex="-1" role="dialog" class="bs-modal type-lg fade type-testi-video">
                <div class="modal-dialog">
                    <div class="modal-body">
                        <div class="modal-content">
                            <div class="video-wrap">
                                <div class="video-container" id="${videoContainerId}">
                                    <!-- The iframe will be dynamically inserted here -->
                                </div>
                                <button class="close-btn js-close video-close" type="button">Close Video</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append the modal to the body or a specific container
        $('body').append(modalHtml);

        // Show the modal and overlay
        $(`#${modalId}`).addClass('modal-show show');
        $('.cm-overlay').addClass('active');
        $('body').css('overflow', 'hidden');

        // Dynamically set the video URL
        if (videoUrl) {
            const embedUrl = generateEmbedUrl(videoUrl);
            if (embedUrl) {
                // Determine the iframe width and height for desktop and mobile
                let iframeWidth = '688'; // Default width for desktop
                let iframeHeight = '550'; // Default height for desktop

                // Check if the device is mobile using window width
                if ($(window).width() <= 768) {
                    iframeWidth = '100%'; // Full width for mobile
                    iframeHeight = 'auto'; // Adjust height for mobile
                }

                // Insert the iframe for the specific modal with dynamic width and height
                const iframeHtml = `<iframe src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen width="${iframeWidth}" height="${iframeHeight}"></iframe>`;
                $(`#${videoContainerId}`).html(iframeHtml); // Insert iframe into the corresponding modal
            } else {
                console.error('Invalid video URL provided.');
            }
        }
    });

    // Handle modal close event only when the close button is clicked
    $(document).on('click', '.js-close', function () {
        const modalId = $(this).closest('.bs-modal').attr('id'); // Get the modal ID
        const videoContainerId = `video-embed-container-${modalId.split('-')[2]}`; // Get the video container ID

        // Hide the modal and the overlay
        $(`#${modalId}`).removeClass('modal-show show');
        $('.cm-overlay').removeClass('active');
        $('body').css('overflow', 'auto');

        // Clear the iframe content to stop the video (without removing the image)
        $(`#${videoContainerId}`).html(''); // Remove iframe from the modal
    });

    // Function to generate embed URL based on video type (YouTube, Vimeo)
    function generateEmbedUrl(url) {
        console.log('Generating embed URL for:', url);

        // YouTube video URL pattern
        const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
        }

        // Vimeo video URL pattern
        const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
        }

    // Local video file pattern
    if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
        return `<video controls autoplay width="100%">
                    <source src="${url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
    }   
        console.error('Unsupported video platform.');
        return null; // Return null if URL doesn't match known platforms
    }
}

// youtubePopup js end

