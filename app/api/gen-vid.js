import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { spawn } from "child_process";

// Function to handle ffmpeg conversion and chunking
async function processVideo(req, res) {
  const { videoUrl } = req.query; // Assuming video URL comes from query parameter

  // Security: Validate video URL to prevent unauthorized access or malicious content
  if (!isValidVideoUrl(videoUrl)) {
    return res.status(400).json({ error: "Invalid video URL" });
  }

  const outputDir = "/public/output"; // Replace with a secure location
  const fileName = "output.mp4"; // Adjust as needed

  // Create temporary output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Spawn ffmpeg process with appropriate options
  const ffmpeg = spawn("ffmpeg", [
    "-i",
    videoUrl, // Input video URL
    "-c:v",
    "libx264", // Video codec (adjust as needed)
    "-crf",
    "23", // Quality setting (adjust as needed)
    "-preset",
    "veryfast", // Speed preset (adjust as needed)
    "-c:a",
    "aac", // Audio codec (adjust as needed)
    "-b:a",
    "128k", // Audio bitrate (adjust as needed)
    "-f",
    "segment", // Segment output format
    "-segment_duration",
    "5", // Chunk duration (adjust as needed)
    "-segment_list",
    `${outputDir}/playlist.m3u8`, // MPD manifest file
    "-segment_timecodes",
    "1", // Include timecodes in manifest for accurate seeking
    `${outputDir}/${fileName}%03d.ts`, // Output chunk filenames with padding
  ]);

  // Handle ffmpeg process events (error, exit, etc.)
  ffmpeg.on("error", (error) => {
    console.error("FFmpeg error:", error);
    res.status(500).json({ error: "FFmpeg conversion failed" });
  });

  ffmpeg.on("exit", (code) => {
    if (code !== 0) {
      console.error("FFmpeg exited with code:", code);
      res.status(500).json({ error: "FFmpeg conversion failed" });
    } else {
      // Send response with MPD manifest information
      const manifestData = fs.readFileSync(
        `${outputDir}/playlist.m3u8`,
        "utf-8"
      );
      res.setHeader("Content-Type", "application/x-mpegURL"); // Set appropriate content type
      res.json({ manifest: manifestData });
    }
  });
}

export default processVideo;
