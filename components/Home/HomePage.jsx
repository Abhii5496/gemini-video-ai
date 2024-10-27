"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { uploadToGemini, waitForFilesActive } from "@/src/utils/actions";
import VideoPreview from "@/components/VideoPreview";
// import { uploadToGemini, waitForFilesActive } from "@/src/utils/actions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { UploadButton } from "./UploadButton";
import usechatStore from "@/lib/linkStore";
import { ChatCollection } from "./ChatCollection";
import { ClearAlert } from "./ClearAlert";

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [focusText, setFocusText] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [vidStatus, setVidStatus] = useState(false)
  const { addNewChat, chatHistory, clearChat } = usechatStore((state) => state)

  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const inputRef = useRef(null);
  const fileType = [
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

  const checkFileType = (file) => {
    if (!file) throw new Error("Please select a file");
    const isValidType = fileType.includes(file.type);
    if (!isValidType) throw new Error("Unsupported file type");
    return isValidType;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(checkFileType(file));
    if (checkFileType(file)) {
      setSelectedFile(file);
      setFocusText(true);
      setVideoURL(URL.createObjectURL(file));
    }
  };


  // console.log("file", selectedFile);
  // console.log(focusText);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1.15,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };


  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [generating, setGenerating] = useState(false)

  // console.log(uploadMessage);

  const uploadVideo = async () => {
    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("mimeType", selectedFile.type);

    setUploadStatus("uploading");
    try {
      const response = await axios.post("/api/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setUploadMessage(
          `File uploaded successfully! Access it at ${response.data.path}`
        );

        const data = await uploadToGemini(
          response.data.path,
          response.data.type
        )
        console.log(data);
        setUploadData(data);
        // await waitForFilesActive([data])

        setUploadStatus("success");
        addNewChat({
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: data.mimeType,
                fileUri: data.uri,
              },
            },
          ],
        },
        );
      } else {
        setUploadMessage("Upload failed.");
        setUploadStatus("error");
      }
    } catch (error) {
      setUploadMessage(`Upload error: ${error.message}`);
      setUploadStatus("error");
    }
  };

  console.log(chatHistory);

  useEffect(() => {
    if (selectedFile !== null) {
      uploadVideo();
    }
  }, [selectedFile]);

  async function handleSubmit(e) {
    e.preventDefault();
    setGenerating(true)
    // if (!selectedFile) return alert("Please select a video");
    if (!prompt) return alert("Please enter prompt");

    try {
      setPrompt("");
      const chatSession = model.startChat({
        generationConfig,
        history: chatHistory,
      });

      addNewChat({
        role: "user",
        parts: [{ text: prompt }],
      });

      const result = await chatSession.sendMessage(prompt);
      // console.log(result.response.text());
      addNewChat({
        role: "model",
        parts: [{ text: result.response.text() }],
      },)
      window.scrollTo(0, document.body.scrollHeight);
      setGenerating(false)
    } catch (error) {
      return alert("Something went wrong");
    }
  }

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
  //       if (!prompt) return alert("Please enter prompt");
  //       handleSubmit();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [prompt]);

  return (
    <>
      <div className="min-h-[calc(100vh-80px)] lg:min-h-[100vh] flex-1 rounded-xl md:min-h-min py-3 relative">
        <div className="w-full h-full flex gap-2  px-4 ">

          <ChatCollection chatHistory={chatHistory} />

        </div>
      </div>

      {/* --------Search Bar----------- */}
      <div className="sticky bottom-0 left-0 bg-background z-40 flex flex-col justify-center items-center w-full p-4 gap-1">
        {uploadStatus === 'uploading' && <div className="rounded-full w-full  ">
          <div className="w-60 h-32 bg-muted  rounded-3xl animate-in fade-in-0 zoom-in-95" >
            <div className="flex justify-center items-center flex-col w-full h-full">
              <div className="animate-spin rounded-full border-4 border-t-transparent border-primary/80 w-10 h-10"></div>
              <p className="text-sm text-primary/80 pt-2 ">Uploading...</p>
            </div>
          </div>
        </div>}
        {uploadStatus === 'success' && <div className="rounded-full w-full  ">
          <div className="w-60 h-fit bg-muted  rounded-3xl animate-in fade-in-0 zoom-in-95 p-2 bg-green-600" >
            <div className="flex justify-center items-center flex-col w-full h-full text-sm">
              Uploaded succesfully 🎉🎉..
            </div>
          </div>
        </div>}

        <div className="flex gap-1 justify-center items-center w-full">
          <div className="bg-muted/50 rounded-full flex justify-center items-center gap-1 w-full overflow-hidden py-2 px-2">
            <input
              autoFocus={focusText}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. summarize this video"
              className=" bg-transparent w-full p-2 text-sm outline-none focus:outline-none ring-0 focus:ring-0"
            />
            <div className="flex gap-1">
              {uploadStatus !== 'uploading' && <UploadButton handleFileChange={handleFileChange} />}
              {!generating ? <Button disabled={uploadStatus == 'uploading'} variant="secondary" className="rounded-full hover:bg-foreground hover:text-secondary"
                onClick={handleSubmit}>
                Run
              </Button> : <div className=" flex justify-center items-center gap-1 bg-muted/80 px-2 py-0 rounded-2xl">
                <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-0 duration-500 bg-white rounded-full"></div>
                <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-75 duration-500 bg-white rounded-full"></div>
                <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-150 duration-500 bg-white rounded-full"></div>
                <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-200 duration-500 bg-white rounded-full"></div>
              </div>}
            </div>
          </div>

          {/* //clear */}
          <ClearAlert clearChat={clearChat} />

        </div>
      </div>
    </>
  );
};

export default HomePage;
