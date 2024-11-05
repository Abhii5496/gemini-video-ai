import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Message, StreamData, streamText } from "ai";
// import { comparePassword } from "@/src/utils/compare-pass";

export const maxDuration = 60;

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const google = createGoogleGenerativeAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  apiKey,
});

export async function POST(req) {
  const body = await req.json();
  // console.log(body);

  // const isMatch = await comparePassword(
  //   process.env.NEXT_PUBLIC_GEN_TOKEN,
  //   body.token
  // );
  // console.log(isMatch, body.model);

  // if (!body.token || !isMatch) {
  //   return NextResponse.json(
  //     { success: false, message: "Not Authorized" },
  //     { status: 400 }
  //   );
  // }

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
  try {
    const model = google(
      body.model ? "models/" + body.model : "models/gemini-1.5-flash"
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
    console.log(error);
    return NextResponse.json({ error });
  }
}
