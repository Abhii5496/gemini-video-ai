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

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [focusText, setFocusText] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [historyData, setHistoryData] = useState([]);

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

  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setVideoURL(URL.createObjectURL(file));
    // console.log(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setVideoURL("");
    setUploadStatus("");
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

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadData, setUploadData] = useState(null);

  // console.log(uploadMessage, uploadProgress);

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

        setUploadData(response.data);
        const data = await uploadToGemini(
          response.data.path,
          response.data.type
        );

        console.log(data);
        setUploadStatus("success");
        // setHistoryData((prev) => [
        //   ...prev,
        //   {
        //     role: "user",
        //     parts: [
        //       {
        //         fileData: {
        //           mimeType: files[0].mimeType,
        //           fileUri: files[0].uri,
        //         },
        //       },
        //     ],
        //   },
        // ]);
      } else {
        setUploadMessage("Upload failed.");
        setUploadStatus("error");
      }
    } catch (error) {
      setUploadMessage(`Upload error: ${error.message}`);
      setUploadStatus("error");
    }
  };

  console.log(historyData);

  useEffect(() => {
    if (selectedFile !== null) {
      uploadVideo();
    }
  }, [selectedFile]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedFile) return alert("Please select a video");
    if (!prompt) return alert("Please enter prompt");

    try {
      setPrompt(" ");
      const chatSession = model.startChat({
        generationConfig,
        history: historyData,
      });

      setHistoryData((prev) => [
        ...prev,
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ]);

      const result = await chatSession.sendMessage(prompt);
      console.log(result.response.text());
      setHistoryData((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: result.response.text() }],
        },
      ]);
    } catch (error) {
      return alert("Something went wrong");
    }
  }

  return (
    // <div className="flex justify-center items-center flex-col h-screen">
    //   <h1 className="font-bold text-3xl py-3">
    //     Upload video and ask questions.
    //   </h1>

    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white/10  backdrop-blur-lg rounded-xl p-5 w-1/2 flex justify-center items-center flex-col "
    //   >
    //     {selectedFile == null && (
    //       <div
    //         onDragOver={handleDragOver}
    //         onDrop={handleDrop}
    //         onDragLeave={handleDragLeave}
    //         className={`w-full h-40 rounded-xl flex items-center justify-center cursor-pointer
    //         ${dragging ? "bg-white/20" : "bg-white/10 hover:bg-white/15"}`}
    //       >
    //         <input
    //           type="file"
    //           id="video"
    //           accept="video/*"
    //           hidden
    //           onChange={handleFileChange}
    //           ref={inputRef}
    //         />
    //         <label
    //           htmlFor="video"
    //           className="w-full relative h-full rounded-xl flex justify-center items-center z-10 cursor-pointer"
    //         >
    //           {dragging
    //             ? "Release to upload"
    //             : "Click or drag a video here to upload"}
    //         </label>
    //       </div>
    //     )}
    //     {/* {selectedFile !== null && ( */}
    //     <VideoPreview
    //       videoURL={selectedFile}
    //       onRemove={() => setSelectedFile(null)}
    //       uploadStatus={uploadStatus}
    //     />
    //     {/* )} */}
    //     <div className="py-3 w-full">
    //       <input
    //         autoFocus={focusText}
    //         value={prompt}
    //         onChange={(e) => setPrompt(e.target.value)}
    //         placeholder="e.g. summarize this video"
    //         className="rounded-md w-full p-2 text-black"
    //       />
    //     </div>
    //     <div className="pt-3 flex gap-4 justify-center items-center w-full">
    //       <button
    //         type="submit"
    //         // onClick={handleSubmit}
    //         disabled={uploadStatus == "uploading"}
    //         className="bg-black rounded-xl p-2 hover:bg-black/50 "
    //       >
    //         {uploadStatus === "uploading" ? "Uploading Video..." : "Proceed"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div className="min-h-[calc(100vh-80px)] lg:min-h-[100vh] flex-1 rounded-xl md:min-h-min py-3 relative">
      <div className="w-full h-full flex gap-2 justify-center items-center px-4 ">
        <div className="absolute bottom-0 left-0 flex flex-col justify-center items-center w-full p-4 gap-1">
          {/* <div className="rounded-full w-full  ">
            <div className="w-full sm:w-[80%] bg-muted h-40 rounded-3xl animate-in fade-in-0 zoom-in-95" >

            </div>
          </div> */}

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
                <UploadButton handleFileChange={handleFileChange} />
                <Button variant="secondary" className="rounded-full">
                  Run
                </Button>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild >
                  <button className="hidden sm:flex rounded-full p-2 hover:bg-muted bg-muted">
                    <ReloadIcon />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
