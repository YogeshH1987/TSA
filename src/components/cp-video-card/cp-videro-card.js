$(document).ready(function () {

    document.addEventListener("DOMContentLoaded", function () {
        const players = {}; // Store YouTube player instances by iframe ID
        let currentPlayer = null; // Track the currently playing player
    
        // Dynamically load the YouTube IFrame API script if not already loaded
        if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
            const scriptTag = document.createElement("script");
            scriptTag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(scriptTag);
        }
    
        // Function to initialize a YouTube player
        function initializeYouTubePlayer(iframe) {
            const videoId = extractVideoId(iframe.src); // Extract the video ID
            const iframeId = iframe.id || `youtube-player-${videoId}`;
    
            // Assign a unique ID to the iframe if it doesn't have one
            if (!iframe.id) iframe.id = iframeId;
    
            // Initialize the YouTube player
            players[iframeId] = new YT.Player(iframeId, {
                events: {
                    onStateChange: function (event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            // Stop the currently playing video if it's not the same
                            if (currentPlayer && currentPlayer !== players[iframeId]) {
                                currentPlayer.stopVideo();
                                console.log(`Stopped video with ID: ${currentPlayer.getIframe().id}`);
                            }
    
                            // Update the current player to the new one
                            currentPlayer = players[iframeId];
                        }
    
                        // Handle video stopping or pausing
                        if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            if (currentPlayer === players[iframeId]) {
                                currentPlayer = null;
                                console.log(`Video with ID: ${iframeId} has stopped/paused.`);
                            }
                        }
                    },
                },
                playerVars: {
                    autoplay: 0, // Disable autoplay on load
                    controls: 1, // Show player controls
                    modestbranding: 1, // Minimal YouTube branding
                    loop: 1, // Loop the video
                    playlist: videoId, // Required for looping
                },
            });
        }
    
        // Function called when the YouTube IFrame API is ready
        window.onYouTubeIframeAPIReady = function () {
            console.log("YouTube API is ready");
    
            // Initialize YouTube players for all existing iframe elements
            document.querySelectorAll("iframe[src*='youtube.com/embed/']").forEach(initializeYouTubePlayer);
        };
    
        // Utility function to extract the video ID from the iframe's src URL
        function extractVideoId(src) {
            const regex = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
            const match = src.match(regex);
            return match ? match[1] : null;
        }
    
        // MutationObserver to detect dynamically added iframes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === "IFRAME" && node.src.includes("youtube.com/embed/")) {
                        initializeYouTubePlayer(node); // Initialize the new iframe
                    }
                });
            });
        });
    
        // Start observing the document body for dynamically added iframes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
    
});

let swiper; // Scoped to this function

$(document).ready(function () { 
    realStoriesSlider();  
});

$(window).resize(function () {
    realStoriesSlider();
});

function realStoriesSlider() {
    if ($(window).width() < 768) {
      if (!swiper) {
        swiper = new Swiper(".js-real-stories", {
          slidesPerView: "auto",
          loop: true,
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = undefined;
      }
    }
}
