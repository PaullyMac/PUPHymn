document.addEventListener("DOMContentLoaded", function() {
  const audioPlayer = document.getElementById("audio-player");
  const toggleBtn = document.getElementById("toggle-btn");
  const toggleIcon = document.getElementById("toggle-icon");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeSpan = document.querySelector(".current-time");
  const fullTimeSpan = document.querySelector(".full-time");
  const lyricLines = document.querySelectorAll(".lyric-line");
  const backwardBtn = document.getElementById("backward-btn");
  const forwardBtn = document.getElementById("forward-btn");
  
  // Volume control elements
  const volumeBtn = document.getElementById("volume-btn");
  const volumeOnIcon = document.getElementById("volume-on-icon");
  const volumeOffIcon = document.getElementById("volume-off-icon");
  const volumeSlider = document.getElementById("volume-slider");
  const volumeSliderContainer = document.querySelector(".volume-slider-container");

  // Initialize current time to 0:00
  currentTimeSpan.innerText = "0:00";
  
  // Initialize the volume slider value and audio volume
  audioPlayer.volume = volumeSlider.value / 100;
  updateVolumeSliderAppearance();
  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return min + ":" + (sec < 10 ? "0" + sec : sec);
  }
 
  toggleBtn.setAttribute("title", "Play");

  // Volume control functions
  function updateVolumeSliderAppearance() {
    const volumeValue = volumeSlider.value;
    
    // Since the slider is physically flipped, we don't need to invert the value
    // Just use the direct value for the gradient
    volumeSlider.style.setProperty('--volume', volumeValue + '%');
    
    // Update the volume icons based on volume value
    if (volumeValue == "0") {
      volumeOnIcon.classList.remove("active");
      volumeOffIcon.classList.add("active");
      volumeBtn.setAttribute("title", "Unmute");
    } else {
      volumeOnIcon.classList.add("active");
      volumeOffIcon.classList.remove("active");
      volumeBtn.setAttribute("title", "Mute");
    }
  }

  // Update initial volume appearance
  updateVolumeSliderAppearance();
  
  // Volume slider event listener - update for smoother operation
  volumeSlider.addEventListener("input", function() {
    const volumeValue = this.value;
    audioPlayer.volume = volumeValue / 100;
    
    // Just use the direct value for the gradient
    volumeSlider.style.setProperty('--volume', volumeValue + '%');
    
    updateVolumeSliderAppearance();
  });
  
  // Volume button click event (mute/unmute)
  volumeBtn.addEventListener("click", function() {
    if (audioPlayer.volume > 0) {
      // Store the current volume before muting
      volumeBtn.dataset.prevVolume = volumeSlider.value;
      volumeSlider.value = 0;
      audioPlayer.volume = 0;
    } else {
      // Restore to previous volume or default to 100
      const prevVolume = volumeBtn.dataset.prevVolume || 100;
      volumeSlider.value = prevVolume;
      audioPlayer.volume = prevVolume / 100;
    }
    updateVolumeSliderAppearance();
  });

  // Volume slider visibility control
  let hideSliderTimeout;
  
  // Function to show the volume slider
  function showVolumeSlider() {
    // Clear any existing timeout
    if (hideSliderTimeout) {
      clearTimeout(hideSliderTimeout);
    }
    // Show the slider
    volumeSliderContainer.classList.add("visible");
  }
  
  // Function to hide the volume slider after delay
  function scheduleHideVolumeSlider() {
    // Set timeout to hide after 5 seconds
    hideSliderTimeout = setTimeout(() => {
      volumeSliderContainer.classList.remove("visible");
    }, 3500); // 3.5 seconds delay
  }
  
  // Show slider when hovering volume button
  volumeBtn.addEventListener("mouseenter", showVolumeSlider);
  volumeBtn.addEventListener("mouseleave", scheduleHideVolumeSlider);
  
  // Keep slider visible when hovering the slider itself
  volumeSliderContainer.addEventListener("mouseenter", showVolumeSlider);
  volumeSliderContainer.addEventListener("mouseleave", scheduleHideVolumeSlider);
  
  // Show the slider initially if needed
  showVolumeSlider();
  // Start the hide timer
  scheduleHideVolumeSlider();

  lyricLines.forEach(line => {
    line.addEventListener("click", function() {
      const lineTime = parseFloat(this.getAttribute("data-time"));
      if (!isNaN(lineTime) && audioPlayer.duration) {
        audioPlayer.currentTime = lineTime;
        
        // If the audio is paused, play it when a line is clicked
        if (audioPlayer.paused) {
          audioPlayer.play();
          toggleIcon.src = "pause.png";
          toggleBtn.setAttribute("title", "Pause");
        }
      }
    });
  });

  toggleBtn.addEventListener("click", function() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      toggleIcon.src = "pause.png";
      toggleBtn.setAttribute("title", "Pause");
    } else {
      audioPlayer.pause();
      toggleIcon.src = "play.png";
      toggleBtn.setAttribute("title", "Play");
    }
  });

  audioPlayer.addEventListener("loadedmetadata", function() {
    if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
      fullTimeSpan.innerText = formatTime(audioPlayer.duration);
    } else {
      fullTimeSpan.innerText = "1:52";
    }
  });

  audioPlayer.addEventListener("timeupdate", function() {
    if (audioPlayer.duration) {
      progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      currentTimeSpan.innerText = formatTime(audioPlayer.currentTime);
    }
    
    // Remove active class from all lyric-lines
    let currentActive = null;
    lyricLines.forEach(line => {
      const lineTime = parseFloat(line.getAttribute("data-time"));
      line.classList.remove("active");
      if (audioPlayer.currentTime >= lineTime) {
        currentActive = line;
      }
    });
    
    // Mark only the latest lyric as active and scroll it into view.
    if (currentActive) {
      currentActive.classList.add("active");
      currentActive.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  progressBar.addEventListener("input", function() {
    if (audioPlayer.duration) {
      audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
  });

  audioPlayer.addEventListener("ended", function() {
    progressBar.value = 0;
    currentTimeSpan.innerText = "0:00";
    toggleIcon.src = "play.png";
    toggleBtn.setAttribute("title", "Play");

    // Reset lyrics: remove active class from all lyric lines
    lyricLines.forEach(function(line) {
      line.classList.remove("active");
    });
    // Reset scroll position of the lyrics container to the top
    document.getElementById("lyrics").scrollTop = 0;
  });

  // Add event listener for backward button
  backwardBtn.addEventListener("click", function() {
    // Skip back 5 seconds, but not below 0
    if (audioPlayer.currentTime >= 5) {
      audioPlayer.currentTime -= 5;
    } else {
      audioPlayer.currentTime = 0;
    }
  });
  
  // Add event listener for forward button
  forwardBtn.addEventListener("click", function() {
    // Skip forward 5 seconds, but not beyond duration
    if (audioPlayer.duration && audioPlayer.currentTime + 5 < audioPlayer.duration) {
      audioPlayer.currentTime += 5;
    } else if (audioPlayer.duration) {
      audioPlayer.currentTime = audioPlayer.duration;
    }
  });
});