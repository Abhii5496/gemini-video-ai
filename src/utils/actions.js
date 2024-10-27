"use server";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

export async function uploadToGemini(path, mimeType) {
  try {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function waitForFilesActive(files) {
  let processing;
  try {
    console.log("Waiting for file processing...");
    processing = "start";
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name);
        processing = "processing";
        console.log("waitForFilesActive", file);
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready");
    processing = "end";
    return processing;
  } catch (error) {
    console.log(error);
  }
}
