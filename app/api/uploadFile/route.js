import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  // console.log(data);
  const file = data.get("file");
  const type = data.get("mimeType");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `public/uploads/${file.name}`;
  await writeFile(path, buffer);
  // console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true, path, type, filename: file.name });
}

export const dynamic = "force-dynamic";
