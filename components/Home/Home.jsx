"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadButton } from "./UploadButton";
import usechatStore from "@/lib/store";
import { ChatCollection } from "./ChatCollection";
import { ClearAlert } from "./ClearAlert";
import { SendButton } from "./SendButton";
import { compressImageToBase64, convertVideoToBase64 } from "@/lib/helper";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { StopCircle, StopCircleIcon } from "lucide-react";
import Header from "./Header";

const Home = () => {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    data,
    error,
    stop,
    addToolResult,
    setMessages,
    setInput,
    setData,
  } = useChat({ api: "/api/generate-content" });

  console.log(messages, input, isLoading);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBase64Data("");
    setMimeType(file.type);

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

  // console.log("file", selectedFile);
  // console.log(focusText);

  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!input) {
      alert("Please enter prompt");
      return;
    }
    setInput("");
    handleSubmit();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      console.log(textareaRef.current.style.height);
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;

      textareaRef.current.style.height = scrollHeight - 24 + "px";
    }
  }, [input]);

  return (
    <>
      <Header isLoading={isLoading} setMessages={setMessages} />
      <div className="h-[calc(100svh-80px)] sm:min-h-[calc(100vh-80px)] flex-1 rounded-xl md:min-h-min py-3 relative   ">
        <div className="w-full h-full flex gap-2  px-4 ">
          <ChatCollection chatHistory={messages} status={isLoading} />
        </div>
      </div>

      {/* --------Search Bar----------- */}
      <div className="sticky bottom-0    left-0 bg-background z-40 flex flex-col justify-center items-center w-full p-4 gap-1">
        {/* {uploadStatus === "uploading" && (
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
        )} */}

        <div className="flex gap-1 justify-center items-end w-full">
          <div className="bg-muted/50  max-h-[250px]  rounded-3xl flex justify-center items-end gap-1 w-full overflow-hidden py-2 px-2">
            <div className="w-full py-1.5 relative flex items-center justify-center overflow-hidden">
              <textarea
                ref={textareaRef}
                autoFocus={true}
                value={input}
                onChange={handleInputChange}
                style={{ minHeight: 20, maxHeight: 250, height: 20 }}
                placeholder="e.g. summarize this video"
                className="w-full resize-none outline-none bg-transparent placeholder:text-gray-400 overflow-y-auto"
              />
            </div>
            <div className="flex gap-1 ">
              {/* {!isLoading && (
                <UploadButton handleFileChange={handleFileChange} />
              )} */}
              {!isLoading ? (
                <SendButton
                  handleSubmit={onSubmit}
                  // uploadStatus={uploadStatus}
                />
              ) : (
                <Button
                  onClick={stop}
                  variant="secondary"
                  className="rounded-full px-3 gap-1 justify-center items-center  hover:bg-foreground hover:text-secondary"
                >
                  <StopCircle size={30} /> Stop
                </Button>
              )}
            </div>
          </div>

          {/* //clear */}
          <div className="hidden sm:flex">
            <ClearAlert clearChat={() => setMessages([])} status={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
