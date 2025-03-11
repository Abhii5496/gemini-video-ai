"use client";
import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  // Function to set up quality levels
  const setupQualityLevels = (player) => {
    const qualityLevels = player.qualityLevels();

    // Disable quality levels with less than 720 horizontal lines of resolution when added
    qualityLevels.on("addqualitylevel", function (event) {
      const qualityLevel = event.qualityLevel;
      if (qualityLevel.height >= 720) {
        qualityLevel.enabled = true;
      } else {
        qualityLevel.enabled = false;
      }
    });

    // Listen to change events for when the player selects a new quality level
    qualityLevels.on("change", function () {
      console.log("Quality Level changed!");
      console.log("New level:", qualityLevels[qualityLevels.selectedIndex]);
    });

    // Add a method to the player to toggle quality
    player.toggleQuality = (function () {
      let enable720 = true;

      return function () {
        for (let i = 0; i < qualityLevels.length; i++) {
          const qualityLevel = qualityLevels[i];
          if (qualityLevel.height >= 720) {
            qualityLevel.enabled = enable720;
          } else {
            qualityLevel.enabled = !enable720;
          }
        }
        enable720 = !enable720;
      };
    })();

    return qualityLevels;
  };

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        // Setup quality levels when player is ready
        const qualityLevels = setupQualityLevels(player);

        // Store the current selected quality level index
        player.currentSelectedQualityLevelIndex = qualityLevels.selectedIndex; // -1 if no level selected

        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);

      // Reset quality levels when source changes
      setupQualityLevels(player);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
