var winWidth = $(window).width();
//var swiper; // Declare swiper outside to reuse it

$(document).ready(function () { 
    //realStoriesSlider(); 
    videoPlayButton();

    const videoId = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');const iframeMarkup = '<iframe  src="//www.youtube.com/embed/' 
    + videoId + '" frameborder="0" allowfullscreen></iframe>';
});
console.log('Video ID:', videoId)

$(window).resize(function () {
 // realStoriesSlider();
  videoPlayButton();
});

function realStoriesSlider() {
  if ($(window).width() < 768) {
    // Initialize Swiper only if it hasn't been initialized
    if (!swiper) {
      swiper = new Swiper(".js-real-stories", {
        slidesPerView: "auto",
        loop: true,
      });
    }
  } else {
    // Destroy Swiper if it exists and the window width is >= 769
    if (swiper) {
      swiper.destroy(true, true);
      swiper = undefined;
    }
  }
}

function videoPlayButton(){
  var player; // Declare player globally to access across functions
var videoPlayedOnce = false; // Track if the video has played once

$(document).ready(function () {
  videoPlayButton(); // Initialize video play button functionality
});

function videoPlayButton() {
  // Check if the YouTube API script has already been added
  if (!document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);
  }

  // YouTube API will call this function once it's ready
  window.onYouTubeIframeAPIReady = function () {
    if (!player) {
      player = new YT.Player("youtubeIframe", {
        playerVars: {
          controls: 0, // Hide YouTube controls
          modestbranding: 1, // Minimal branding
          rel: 0, // No related videos
          showinfo: 0, // Hide video info
          fs: 0, // Disable fullscreen option
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };
}

// Play Button Click Handler
function onPlayerReady(event) {
  const playButton = document.getElementById("customPlayButton");

  if (playButton) {
    playButton.addEventListener("click", () => {
      if (player && player.playVideo) {
        playButton.style.display = "none"; // Hide the custom play button
        player.playVideo(); // Start the video
      } else {
        console.error("Player is not initialized.");
      }
    });
  } else {
    console.error("Custom play button not found.");
  }
}

// Handle Video State Changes (Play, Pause, End)
function onPlayerStateChange(event) {
  const playButton = document.getElementById("customPlayButton");

  if (event.data === YT.PlayerState.PAUSED) {
    // When the video is paused, show the custom play button
    if (playButton) {
      playButton.style.display = "block";
    }
  } else if (event.data === YT.PlayerState.PLAYING) {
    // When the video is playing, hide the custom play button
    if (playButton) {
      playButton.style.display = "none";
    }
  } else if (event.data === YT.PlayerState.ENDED) {
    // Stop video after one loop
    if (!videoPlayedOnce) {
      videoPlayedOnce = true; // Mark as played once
      player.playVideo(); // Start looping
    } else {
      if (playButton) {
        playButton.style.display = "block"; // Show play button when video ends
      }
      player.stopVideo(); // Stop the video after one loop
    }
  }
}

}