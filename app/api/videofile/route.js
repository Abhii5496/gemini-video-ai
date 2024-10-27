import { NextApiRequest, NextApiResponse } from "next";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import fs from "fs";
const ffmpeg = createFFmpeg();

export async function POST(request, res) {
  try {
    // Assuming the video file is uploaded in the request body as raw bytes
    const videoData = await request.body;

    if (!videoData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Missing video data in request body",
      });
    }

    const outputDir = "public/output"; // Replace with a secure location
    const fileName = "output.mp4"; // Adjust as needed

    // Create temporary output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const tempFilePath = `${outputDir}/${fileName}`; // Temporary file for video data

    // Write uploaded video data to a temporary file
    await fs.promises.writeFile(tempFilePath, videoData);

    // const ffmpeg = createFFmpeg({ log: true }); // Create ffmpeg instance with logging enabled

    // Fetch the video file from the temporary location
    const videoInput = await fetchFile(tempFilePath);

    const command = ffmpeg
      .input(videoInput) // Use the fetched video file as input
      .outputOptions([
        "-c:v",
        "libx264", // Video codec (adjust as needed)
        "-crf",
        "23", // Quality setting (adjust as needed)
        "-preset",
        "veryfast", // Speed preset (adjust as needed)
        "-c:a",
        "aac", // Audio codec (adjust as as needed)
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
      ])
      .on("start", (commandLine) => {
        console.log("Spawned Ffmpeg with command:", commandLine);
      })
      .on("error", (error) => {
        console.error("FFmpeg error:", error);
        fs.promises.unlink(tempFilePath).catch((error) => {
          console.error("Error cleaning temporary file:", error);
        });
        return res.status(500).json({
          status: 500,
          success: false,
          message: "FFmpeg conversion failed",
        });
      })
      .on("end", () => {
        // Clean up temporary file after successful processing
        fs.promises.unlink(tempFilePath).catch((error) => {
          console.error("Error cleaning temporary file:", error);
        });

        // Send response with MPD manifest information
        const manifestData = fs.readFileSync(
          `${outputDir}/playlist.m3u8`,
          "utf-8"
        );
        return res.status(200).json({
          status: 200,
          success: true,
          manifest: manifestData,
        });
      });

    await command.run(); // Execute the ffmpeg command
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
    });
  }
}
