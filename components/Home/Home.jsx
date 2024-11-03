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

  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadData, setUploadData] = useState(null);
  const [generating, setGenerating] = useState(false);

  const [files, setFiles] = useState(undefined);
  const fileInputRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      onSubmit();
    }
  };

  const onSubmit = (event) => {
    if (!input) {
      alert("Please enter prompt");
      return;
    }
    setInput("");
    handleSubmit(event, {
      experimental_attachments: files,
    });

    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;

      textareaRef.current.style.height = scrollHeight - 24 + "px";
    }
  }, [input]);

  console.log(messages);

  return (
    <>
      <Header isLoading={isLoading} setMessages={setMessages} />
      <div className="h-[calc(100svh-80px)] sm:min-h-[calc(100vh-80px)] flex-1 rounded-xl md:min-h-min py-3 relative   ">
        <div className="w-full h-full flex gap-2  px-4 ">
          <ChatCollection chatHistory={messages} status={isLoading} />
        </div>
      </div>

      {/* --------Search Bar----------- */}
      <div className="sticky bottom-0 left-0 bg-muted z-40 flex flex-col justify-center items-center w-full p-4 gap-1">
        {!generating && files?.length > 0 && (
          <div className="rounded-full w-full  ">
            <div className="flex justify-start items-center gap-2 bg-muted-foreground/20 w-fit rounded-xl p-2">
              <div className="size-7 bg-muted-foreground/30 flex justify-center items-center rounded-lg">
                <svg
                  data-testid="geist-icon"
                  height="16"
                  stroke-linejoin="round"
                  viewBox="0 0 16 16"
                  width="16"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8591 1.70735C10.3257 1.70735 9.81417 1.91925 9.437 2.29643L3.19455 8.53886C2.56246 9.17095 2.20735 10.0282 2.20735 10.9222C2.20735 11.8161 2.56246 12.6734 3.19455 13.3055C3.82665 13.9376 4.68395 14.2927 5.57786 14.2927C6.47178 14.2927 7.32908 13.9376 7.96117 13.3055L14.2036 7.06304L14.7038 6.56287L15.7041 7.56321L15.204 8.06337L8.96151 14.3058C8.06411 15.2032 6.84698 15.7074 5.57786 15.7074C4.30875 15.7074 3.09162 15.2032 2.19422 14.3058C1.29682 13.4084 0.792664 12.1913 0.792664 10.9222C0.792664 9.65305 1.29682 8.43592 2.19422 7.53852L8.43666 1.29609C9.07914 0.653606 9.95054 0.292664 10.8591 0.292664C11.7678 0.292664 12.6392 0.653606 13.2816 1.29609C13.9241 1.93857 14.2851 2.80997 14.2851 3.71857C14.2851 4.62718 13.9241 5.49858 13.2816 6.14106L13.2814 6.14133L7.0324 12.3835C7.03231 12.3836 7.03222 12.3837 7.03213 12.3838C6.64459 12.7712 6.11905 12.9888 5.57107 12.9888C5.02297 12.9888 4.49731 12.7711 4.10974 12.3835C3.72217 11.9959 3.50444 11.4703 3.50444 10.9222C3.50444 10.3741 3.72217 9.8484 4.10974 9.46084L4.11004 9.46054L9.877 3.70039L10.3775 3.20051L11.3772 4.20144L10.8767 4.70131L5.11008 10.4612C5.11005 10.4612 5.11003 10.4612 5.11 10.4613C4.98779 10.5835 4.91913 10.7493 4.91913 10.9222C4.91913 11.0951 4.98782 11.2609 5.11008 11.3832C5.23234 11.5054 5.39817 11.5741 5.57107 11.5741C5.74398 11.5741 5.9098 11.5054 6.03206 11.3832L6.03233 11.3829L12.2813 5.14072C12.2814 5.14063 12.2815 5.14054 12.2816 5.14045C12.6586 4.7633 12.8704 4.25185 12.8704 3.71857C12.8704 3.18516 12.6585 2.6736 12.2813 2.29643C11.9041 1.91925 11.3926 1.70735 10.8591 1.70735Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className="text-sm text-center">math.png</p>
            </div>
          </div>
        )}

        <div className="flex gap-1 justify-center items-end w-full">
          <div className="bg-muted-foreground/10  max-h-[270px]  rounded-3xl flex justify-center items-end gap-1 w-full overflow-hidden py-2 px-2">
            <div className="w-full py-1.5 relative flex items-center justify-center overflow-hidden">
              <textarea
                ref={textareaRef}
                autoFocus={true}
                value={input}
                onChange={handleInputChange}
                style={{ minHeight: 24, maxHeight: 240, height: 24 }}
                placeholder="e.g. summarize this video"
                className="w-full  resize-none outline-none bg-transparent placeholder:text-gray-400 overflow-y-auto"
              />
            </div>
            <div className="flex gap-1 ">
              {!isLoading && (
                <UploadButton fileInputRef={fileInputRef} setFiles={setFiles} />
              )}
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
