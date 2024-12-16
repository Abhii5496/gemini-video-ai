import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import DOMPurify from "dompurify";
import { FileVideoIcon, Sparkles } from "lucide-react";
import { marked } from "marked";
import React, { Fragment, useEffect, useRef } from "react";
import PreviewDialog from "./PreviewDialog";
import hljs from "highlight.js";
import "../../node_modules/highlight.js/styles/github-dark.min.css";

export const ChatCollection = ({ chatHistory, status }) => {
  // console.log(chatHistory);
  // useEffect(() => {
  //   if (!status) {
  //     hljs.highlightAll();
  //   }
  // }, [status]);

  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      {chatHistory && chatHistory.length <= 1 && (
        <div className="h-[60vh] w-full flex-col items-center flex justify-center text-xl font-medium font-mono text-center">
          {/* <p className="">
            Upload any PDF or Image and ask what's on your mind ?
          </p> */}
          <h1 className="text-2xl text-green-300">
            रूपा ए.आई. - आपकी हिंदी सहायक
          </h1>
          <p
            className="pt-6 text-green-300
          "
          >
            रूपा ए.आई. हर सवाल का जवाब केवल हिंदी में देती है। अब भाषा की कोई
            रुकावट नहीं।
          </p>
        </div>
      )}
      {chatHistory &&
        chatHistory.length > 0 &&
        chatHistory.map((chat, i) => (
          <div key={i} className="py-2">
            {chat.role == "user" ? (
              <div className="flex gap-2 items-start justify-end flex-row-reverse">
                <div className="w-full flex flex-col items-end">
                  {chat.experimental_attachments?.length > 0 && (
                    <div className="py-1.5">
                      <PreviewDialog
                        url={chat.experimental_attachments?.[0]?.url}
                        type={chat.experimental_attachments?.[0]?.contentType}
                        name={chat.experimental_attachments?.[0]?.name}
                      />
                    </div>
                  )}
                  <div className="flex justify-end bg-muted-foreground/10 py-2.5 px-2 rounded-xl w-fit">
                    <div
                      className="prose prose-code:overflow-x-auto prose-pre:overflow-x-auto prose-code:!whitespace-pre-wrap prose-code:max-w-full prose-pre:bg-[#1a1a30] prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          marked.parse(chat.content || "")
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              chat.role == "assistant" && (
                <div className="flex gap-1 items-start">
                  <div className="h-8 w-8 flex-shrink-0 my-1.5 bg-muted-foreground/20 flex justify-center items-center rounded-xl">
                    <Sparkles
                      className={`${status ? "animate-pulse" : ""} size-4`}
                    />
                  </div>

                  <div className=" py-2.5 px-2 rounded-xl ">
                    <div
                      className="prose prose-code:overflow-x-auto prose-pre:overflow-x-auto prose-code:!whitespace-pre-wrap prose-code:max-w-full prose-pre:bg-[#1a1a30] prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          marked.parse(chat.content || "")
                        ),
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        ))}
    </div>
  );
};
