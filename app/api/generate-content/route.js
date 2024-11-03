import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, StreamData, streamText } from "ai";

export const maxDuration = 60;

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey,
});

const model = google("models/gemini-1.5-pro-latest");

export async function POST(req) {
  const body = await req.json();
  console.log(body);

  // const messages = reqBody.messages;
  // const userQuestion = `${messages[messages.length - 1].content}`;

  // function fileToGenerativePart() {
  //   return {
  //     inlineData: {
  //       data: body.base64.split(",")[1],
  //       mimeType: body.type,
  //     },
  //   };
  // }
  // const prompt = "Analyze the this given data and give a summmary";
  // const filePart = fileToGenerativePart();

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
}
