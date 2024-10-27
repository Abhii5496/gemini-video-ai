// VideoPreview.js
import React, { memo, useEffect } from "react";

const VideoPreview = ({ videoURL, onRemove, uploadStatus }) => {
  useEffect(() => {
    // Cleanup URL object when component unmounts
    return () => URL.revokeObjectURL(videoURL);
  }, [videoURL]);

  return (
    <div className="aspect-video h-60 w-full  relative">
      {/* {uploadStatus !== "uploading" && ( */}
      <div className="absolute inset-0 bg-red-500 h-full w-full z-50"> </div>
      {/* )} */}
      <video
        className="rounded-xl w-full h-full border border-gray-500 relative z-10"
        src={(videoURL && URL.createObjectURL(videoURL)) || ""}
        loop
        autoPlay
        playsInline
        controls
      />
      {uploadStatus !== "uploading" && (
        <span
          onClick={onRemove}
          className="cursor-pointer hover:bg-red-800 absolute -top-2 -right-2 z-40 p-2 rounded-full bg-black text-white flex justify-center items-center"
        >
          X
        </span>
      )}
    </div>
  );
};

export default memo(VideoPreview);
