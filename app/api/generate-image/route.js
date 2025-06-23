import { GoogleGenAI, Modality } from "@google/genai";

export async function POST(req) {
  const { prompt, imageBase64 } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // Build the parts array for the Gemini API
  const parts = [];
  if (imageBase64) {
    parts.push({
      inlineData: {
        mimeType: "image/png", // You may want to detect the actual mime type
        data: imageBase64,
      },
    });
  }
  if (prompt) {
    parts.push({ text: prompt });
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: [{ parts }],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  let text = "";
  let image = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.text) text = part.text;
    else if (part.inlineData) image = part.inlineData.data;
  }

  return Response.json({ text, imageBase64: image });
}