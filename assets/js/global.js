var winWidth = $(window).width();
var winHeight = $(window).height();

$(document).ready(function () {
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


$(window).resize(function (e) {
    winWidth = $(window).width();
    winHeight = $(window).height();
});

$(window).on('load', function (event) {
    // $('#loaderWrapper').hide();
});

$(window).on('scroll', function (event) {
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
    $('.js-bg').each(function () {
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

    // modal open using class
    $('.model-open').on('click', function (e) {
        e.preventDefault();
        const modalClass = $(this).data('modal-class'); // Get the class name
        console.log('Modal Class:', modalClass);
        $('.' + modalClass).addClass('modal-show'); // Open modal using class
        $('.cm-overlay').addClass('active');
    });
    // modal open using class end

    // Close modal
    $('.js-close, .cm-overlay').on('click', function () {
        console.log('Close clicked');
        $('.bs-modal').removeClass('modal-show');
        $('.cm-overlay').removeClass('active');
    });
}


// modalPopup js end

// youtubePopup js start

function youtubePopup() {
    let modalCounter = 0;

    // Open modal and insert video
    $(document).on('click', '.model-youtube-open[data-toggle="modal"]', function () {
        const videoUrl = $(this).attr('data-video-url');
        modalCounter++;

        const modalId = `testi-video-${modalCounter}`;
        const videoContainerId = `video-embed-container-${modalCounter}`;

        const modalHtml = `
            <div id="${modalId}" tabindex="-1" role="dialog" class="bs-modal type-lg fade type-testi-video modal-show show">
                <div class="modal-dialog">
                    <div class="modal-body">
                        <div class="modal-content">
                            <div class="video-wrap">
                                <div class="video-container" id="${videoContainerId}"></div>
                                <button class="close-btn js-close video-close" type="button">Close Video</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modalHtml);
        $('.cm-overlay').addClass('active');
        $('body').css('overflow', 'hidden');

        const embedHtml = generateEmbedHtml(videoUrl);
        if (embedHtml) {
            $(`#${videoContainerId}`).html(embedHtml);
        } else {
            console.error('Invalid video URL provided.');
        }
    });

    // Close modal via close button
    $(document).on('click', '.js-close', function () {
        const modalId = $(this).closest('.bs-modal').attr('id');
        closeVideoModal(modalId);
    });

    // Close modal via overlay click
    $(document).on('click', '.cm-overlay', function () {
        const $openModal = $('.bs-modal').last(); // get top-most open modal
        if ($openModal.length) {
            const modalId = $openModal.attr('id');
            closeVideoModal(modalId);
        }
    });

    // Shared close logic
    function closeVideoModal(modalId) {
        const index = modalId.split('-')[2];
        const videoContainerId = `video-embed-container-${index}`;
        const $videoContainer = $(`#${videoContainerId}`);

        // Remove iframe
        $videoContainer.find('iframe').remove();

        // Stop and remove <video> if present
        const $video = $videoContainer.find('video');
        if ($video.length) {
            try {
                $video.get(0).pause();
                $video.get(0).currentTime = 0;
                $video.get(0).src = '';
                $video.get(0).load();
            } catch (e) {
                console.warn('Error stopping video:', e);
            }
            $video.remove();
        }

        // Remove modal, overlay, and restore scroll
        $(`#${modalId}`).remove();
        $('.cm-overlay').removeClass('active');
        $('body').css('overflow', 'auto');
    }

    // Embed logic
    function generateEmbedHtml(url) {
        // Default width/height
        let iframeWidth = '650';
        let iframeHeight = '450';

        // Mobile responsive check
        if ($(window).width() <= 768) {
            iframeWidth = '100%';
            iframeHeight = 'auto';
        }

        const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (youtubeMatch) {
            return `<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen width="${iframeWidth}" height="${iframeHeight}"></iframe>`;
        }

        const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch) {
            return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen width="${iframeWidth}" height="${iframeHeight}"></iframe>`;
        }

        if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')) {
            return `
            <video controls autoplay width="100%">
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`;
        }

        return null;
    }
}



// youtubePopup js end

