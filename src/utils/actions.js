"use server";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

export async function uploadToGemini(path, mimeType) {
  try {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType: "image/png",
      displayName: "mega path",
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function waitForFilesActive(files) {
  console.log(files);
  try {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name);
        console.log("waitForFilesActive", file);
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready\n");
  } catch (error) {
    console.log(error);
  }
}

export const newUploadGemini = async () => {
  const uploadResponse = await fileManager.uploadFile(
    `${"https://utfs.io/f/1xxL72PrW4Y5nKE0CzymO0wUW2oNDb6KxGJE7aV5qFMPYiCL"}`,
    {
      mimeType: "image/png",
      displayName: "Jetpack drawing",
    }
  );

  // Get the previously uploaded file's metadata.
  const getResponse = await fileManager.getFile(uploadResponse.file.name);
  console.log(getResponse);
  // View the response.
  console.log(
    `Retrieved file ${getResponse.displayName} as ${getResponse.uri}`
  );
  return { getResponse, uploadResponse };
};

export async function listAllFiles(params) {
  try {
    const listFilesResponse = await fileManager.listFiles();
    console.log(listFilesResponse);
    return listFilesResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
}
