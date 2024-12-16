"use client";
import {
  newUploadGemini,
  uploadToGemini,
  waitForFilesActive,
} from "@/src/utils/actions";
import VideoPreview from "@/components/VideoPreview";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { UploadButton } from "./UploadButton";
import usechatStore from "@/lib/store";
import { ChatCollection } from "./ChatCollection";
import { ClearAlert } from "./ClearAlert";
import { SendButton } from "./SendButton";
import { compressImageToBase64, convertVideoToBase64 } from "@/lib/helper";
import { useChat } from "ai/react";

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [focusText, setFocusText] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [vidStatus, setVidStatus] = useState(false);
  const {
    addNewChat,
    chatHistory,
    clearChat,
    model: genAiModel,
  } = usechatStore((state) => state);

  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({ api: "/api/generate-content" });

  console.log(messages, input, isLoading);

  const [uploadStatus, setUploadStatus] = useState("idle"); // 'idle', 'uploading', 'success', 'error'
  const [base64Data, setBase64Data] = useState("");
  const [mimeType, setMimeType] = useState("");
  const inputRef = useRef(null);
  const ImgfileType = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif",
  ];

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

  const isPdfFile = (file) => ["application/pdf"].includes(file.type);
  const isImageFile = (file) => ImgfileType.includes(file.type);
  const isvidFile = (file) => vidFileType.includes(file.type);

  const checkFileType = (file) => {
    if (!file) throw new Error("Please select a file");
    const isValidType = fileType.includes(file.type);
    if (!isValidType) throw new Error("Unsupported file type");
    return isValidType;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBase64Data("");
    setMimeType(file.type);
    // console.log(checkFileType(file));
    // if (checkFileType(file)) {
    //   setSelectedFile(file);
    //   setFocusText(true);
    //   setVideoURL(URL.createObjectURL(file));
    // }
    if (isPdfFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileContent = reader.result;
        console.log(fileContent);
        setBase64Data(fileContent);
      };
      reader.readAsDataURL(file);
    }

    if (isImageFile(file)) {
      // console.log("compressig");
      const cImg = await compressImageToBase64(file, 0.1);
      // console.log(cImg);
      setBase64Data(cImg);
    }
    if (isvidFile(file)) {
      console.log("compressig");

      const vidBase64 = await convertVideoToBase64(file);
      console.log(vidBase64);
      setBase64Data(vidBase64);
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [prompt]);

  // console.log("file", selectedFile);
  // console.log(focusText);

  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [generating, setGenerating] = useState(false);

  // console.log(uploadMessage);

  // const uploadVideo = async () => {
  //   const formData = new FormData();
  //   formData.set("file", selectedFile);
  //   formData.set("mimeType", selectedFile.type);

  //   setUploadStatus("uploading");
  //   try {
  //     const response = await axios.post("/api/uploadFile", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.status === 200) {
  //       // console.log(response.data);
  //       setUploadMessage(
  //         `File uploaded successfully! Access it at ${response.data.path}`
  //       );

  //       const data = await uploadToGemini(
  //         response.data.path,
  //         response.data.type
  //       );
  //       // console.log(data);
  //       setUploadData(data);
  //       await waitForFilesActive([data]);

  //       setUploadStatus("success");
  //       addNewChat({
  //         role: "user",
  //         parts: [
  //           {
  //             fileData: {
  //               mimeType: data.mimeType,
  //               fileUri: data.uri,
  //             },
  //           },
  //         ],
  //       });
  //     } else {
  //       setUploadMessage("Upload failed.");
  //       setUploadStatus("error");
  //     }
  //   } catch (error) {
  //     setUploadMessage(`Upload error: ${error.message}`);
  //     setUploadStatus("error");
  //   }
  // };

  // console.log(chatHistory);

  // useEffect(() => {
  //   if (selectedFile !== null) {
  //     uploadVideo();
  //   }
  // }, [selectedFile]);

  // async function handleSubmit(e) {
  //   // if (!selectedFile) return alert("Please select a video");
  //   // setUploadStatus("idle");
  //   // if (!prompt) {
  //   //   alert("Please enter prompt");
  //   //   return;
  //   // }
  //   // if (generating) return;
  //   // try {
  //   // setGenerating(true);
  //   // setPrompt("");
  //   // const chatSession = model.startChat({
  //   //   generationConfig,
  //   //   history: chatHistory,
  //   // });
  //   // addNewChat({
  //   //   role: "user",
  //   //   parts: [{ text: prompt }],
  //   //   file: base64Data,
  //   // });
  //   // const result = await chatSession.sendMessage(prompt);
  //   //   const result = await chatSession.sendMessageStream(prompt);
  //   //   // console.log(result.response.text());
  //   //   let newText = "";
  //   //   for await (const chunk of result.stream) {
  //   //     const chunkText = chunk.text();
  //   //     newText += chunkText;
  //   //     // window.scrollTo(0, document.body.scrollHeight);
  //   //   }
  //   //   addNewChat({
  //   //     role: "model",
  //   //     parts: [{ text: newText }],
  //   //   });
  //   //   // console.log("after", newText);
  //   //   setGenerating(false);
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   setGenerating(false);
  //   //   return alert("Something went wrong");
  //   // }
  //   // try {
  //   //   const res = await axios.post("api/generate-content", {
  //   //     base64: base64Data,
  //   //     type: mimeType,
  //   //     history: chatHistory,
  //   //     genAiModel: genAiModel,
  //   //     prompt,
  //   //   });
  //   //   console.log(res.data);
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        if (!prompt) {
          alert("Please enter prompt");
          return;
        }
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [prompt]);

  // console.log(chatHistory);

  return (
    <>
      <div className="h-[calc(100svh-80px)] sm:min-h-[calc(100vh-80px)] flex-1 rounded-xl md:min-h-min py-3 relative   ">
        <div className="w-full h-full flex gap-2  px-4 ">
          <ChatCollection chatHistory={chatHistory} status={generating} />
        </div>
      </div>

      {/* --------Search Bar----------- */}
      <div className="sticky bottom-0    left-0 bg-background z-40 flex flex-col justify-center items-center w-full p-4 gap-1">
        {uploadStatus === "uploading" && (
          <div className="rounded-full w-full  ">
            <div className="w-60 h-32 bg-muted  rounded-3xl animate-in fade-in-0 zoom-in-95">
              <div className="flex justify-center items-center flex-col w-full h-full">
                <div className="animate-spin rounded-full border-4 border-t-transparent border-primary/80 w-10 h-10"></div>
                <p className="text-sm text-primary/80 pt-2 ">Uploading...</p>
              </div>
            </div>
          </div>
        )}
        {uploadStatus === "success" && !generating && (
          <div className="rounded-full w-full  ">
            <div className="w-60 h-fit bg-muted  rounded-3xl animate-in fade-in-0 zoom-in-95 p-2 bg-green-600">
              <div className="flex justify-center items-center flex-col w-full h-full text-sm">
                Uploaded succesfully 🎉🎉..
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-1 justify-center items-end w-full">
          <div className="bg-muted/50  rounded-3xl flex justify-center items-end gap-1 w-full overflow-hidden py-2 px-2">
            <div className="w-full relative flex items-center overflow-hidden">
              <textarea
                ref={textareaRef}
                autoFocus={focusText}
                value={input}
                onChange={handleInputChange}
                placeholder="e.g. summarize this video"
                className="min-h-[35px] max-h-[200px]  w-full resize-none
                bg-transparent p-2 text-sm outline-none focus:outline-none ring-0 focus:ring-0
                rounded-md border border-none "
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter' && !e.shiftKey) {
                //     e.preventDefault()
                //     handleSubmit(e)
                //   }
                // }}
                // className="bg-transparent w-full p-2 text-sm outline-none focus:outline-none ring-0 focus:ring-0 resize-none"
              />
            </div>
            <div className="flex gap-1 ">
              {/* {uploadStatus !== "uploading" && (
                <UploadButton handleFileChange={handleFileChange} />
              )} */}
              {!generating ? (
                <SendButton
                  handleSubmit={handleSubmit}
                  uploadStatus={uploadStatus}
                />
              ) : (
                <div className=" flex justify-center items-center gap-1 bg-muted/80 px-4 py-0 rounded-full">
                  <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-0 duration-500 bg-white rounded-full"></div>
                  <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-75 duration-500 bg-white rounded-full"></div>
                  <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-150 duration-500 bg-white rounded-full"></div>
                  <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-200 duration-500 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          {/* //clear */}
          <ClearAlert clearChat={clearChat} status={generating} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
