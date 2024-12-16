"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadButton } from "./UploadButton";
import usechatStore from "@/lib/store";
import { ChatCollection } from "./ChatCollection";
import { ClearAlert } from "./ClearAlert";
import { SendButton } from "./SendButton";
import {
  compressImageToBase64,
  convertVideoToBase64,
  geminiModels,
  initialText,
} from "@/lib/helper";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { PaperclipIcon, StopCircle, StopCircleIcon } from "lucide-react";
import Header from "./Header";
import { useScrollToBottom } from "@/hooks/use-scoll-to-bottom";
import { hashPassword } from "@/src/utils/hash-password";

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
  } = useChat({
    api: "/api/generate-content",
    initialMessages: [{ id: 1, role: "system", content: initialText }],
  });

  const { model, addNewChat } = usechatStore((state) => state);
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

  const onSubmit = async (event) => {
    if (!input) {
      alert("Please enter prompt");
      return;
    }
    if (isLoading) return;
    setInput("");

    // const hashedPass = await hashPassword(
    //   process.env.NEXT_PUBLIC_GEN_TOKEN,
    //   10
    // );

    // console.log(hashPassword);
    handleSubmit(event, {
      experimental_attachments: files,
      body: { model },
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

  // console.log(messages);
  // console.log(isLoading, messages);
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom();

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header isLoading={isLoading} setMessages={setMessages} />
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
      >
        <div className="w-full mx-auto max-w-3xl px-4">
          <ChatCollection chatHistory={messages} status={isLoading} />
        </div>

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
      <div className="flex mx-auto sm:px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <div className=" z-40 flex flex-col justify-center items-center w-full p-4 gap-1">
          {!generating && files?.length > 0 && (
            <div className="rounded-full w-full  ">
              <div className="flex justify-start items-center gap-2 bg-muted-foreground/20 w-fit rounded-xl p-2 relative">
                <div className="size-7 bg-muted-foreground/30 flex justify-center items-center rounded-lg">
                  <PaperclipIcon size={20} />
                </div>
                <p className="text-sm text-start">{files[0].name}</p>
                <div
                  onClick={() => setFiles([])}
                  className="absolute z-40 -top-4 -right-2 size-6 bg-red-900 flex items-center justify-center rounded-lg cursor-pointer "
                >
                  <p>X</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-1 justify-center items-end w-full">
            <div className="bg-muted-foreground/10 max-h-[270px]  rounded-3xl flex justify-center items-end gap-1 w-full overflow-hidden py-2 px-2">
              <div className="w-full py-1.5 relative flex items-center justify-center overflow-hidden">
                <textarea
                  ref={textareaRef}
                  autoFocus={true}
                  value={input}
                  onChange={handleInputChange}
                  style={{ minHeight: 24, maxHeight: 240, height: 24 }}
                  placeholder="e.g. summarize this document"
                  className="w-full text-sm resize-none outline-none bg-transparent placeholder:text-gray-400 overflow-y-auto"
                />
              </div>
              <div className="flex gap-1 ">
                {/* {!isLoading && model !== "gemini-1.0-pro" && (
                  <UploadButton
                    fileInputRef={fileInputRef}
                    setFiles={setFiles}
                  />
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
            <div className="hidden sm:flex justify-center items-center h-full">
              <ClearAlert
                clearChat={() => setMessages([])}
                status={isLoading}
                newChat={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
