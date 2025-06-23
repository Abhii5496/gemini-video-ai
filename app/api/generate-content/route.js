import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, StreamData, streamText } from "ai";
// import { comparePassword } from "@/src/utils/compare-pass";

export const maxDuration = 60;

const apiKey = process.env.GEMINI_API_KEY;
const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey,
});

export async function POST(req) {
  const body = await req.json();
  
  try {
    const model = google(
      body.model ? "models/" + body.model : "models/gemini-1.5-flash",
      {
        safetySettings: [
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
        ],
      }
    );
    // console.log(model);
    const data = new StreamData();
    // data.append({
    //   retrievals: retrievals,
    // });

    const result = await streamText({
      model: model,
      prompt: body.prompt,
      messages: body.messages,
      onFinish() {
        data.close();
      },
    });

    return result.toDataStreamResponse({ data });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ error });
  }
}
