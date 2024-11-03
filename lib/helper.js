export const geminiModels = [
  {
    name: "Gemini 1.5 Flash",
    model: "gemini-1.5-flash",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description:
      "Fast and versatile performance across a diverse variety of tasks",
  },
  // {
  //   name: "Gemini 1.5 Flash-8B",
  //   model: "gemini-1.5-flash-8b",
  //   inputModalities: ["Audio", "Images", "Videos", "Text"],
  //   outputModality: "Text",
  //   description: "High volume and lower intelligence tasks",
  // },
  {
    name: "Gemini 1.5 Pro",
    model: "gemini-1.5-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"],
    outputModality: "Text",
    description: "Complex reasoning tasks requiring more intelligence",
  },
  {
    name: "Gemini 1.0 Pro",
    model: "gemini-1.0-pro",
    inputModalities: ["Audio", "Images", "Videos", "Text"], // Assuming same as 1.5 Pro – please verify if needed.
    outputModality: "Text", // Assuming same as 1.5 Pro – please verify if needed.
    description: "", //Description not given. Consider adding based on known information about 1.0 Pro.
  },
];

export function compressImageToBase64(file, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert canvas to Base64 string
        const base64String = canvas.toDataURL("image/jpeg", quality);
        resolve(base64String);
      };

      img.onerror = function () {
        reject(new Error("Image loading failed"));
      };

      // Set the src of the image to the file data URL
      img.src = event.target.result;
    };

    reader.onerror = function () {
      reject(new Error("File reading failed"));
    };

    // Read the file as a Data URL
    reader.readAsDataURL(file);
  });
}

export function convertVideoToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      // The result is a Data URL containing the Base64 string
      resolve(event.target.result);
    };

    reader.onerror = function () {
      reject(new Error("File reading failed"));
    };

    // Read the file as a Data URL
    reader.readAsDataURL(file);
  });
}

const vidFileType = [
  "video/mp4",
  "video/mpeg",
  "video/mov",
  "video/avi",
  "video/x-flv",
  "video/mpg",
  "video/webm",
  "video/wmv",
  "video/3gpp",
];

const ImgfileType = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const isPdfFile = (file) => ["application/pdf"].includes(file.type);
export const isImageFile = (file) => ImgfileType.includes(file.type);
export const isvidFile = (file) => vidFileType.includes(file.type);
