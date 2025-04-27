import fs from "fs";
import path from "path";

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Function to upload a file
export function uploadFile(file) {
  return new Promise((resolve, reject) => {
    // Create a file path with a timestamp to avoid naming conflicts
    const filePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);

    // Use fs to write the file to the upload directory
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log("File uploaded successfully:", filePath);
        resolve(filePath);
      }
    });
  });
}
