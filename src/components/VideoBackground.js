// VideoBackground.js

import React from "react";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop id="video">
        <source src="src/components/images/back.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
};
export default VideoBackground;
