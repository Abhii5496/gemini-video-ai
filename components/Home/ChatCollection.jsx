import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"
import DOMPurify from "dompurify"
import { FileVideoIcon, Sparkles } from "lucide-react"
import { marked } from "marked"
import React, { Fragment, useEffect, useRef, useState } from "react"
import PreviewDialog from "./PreviewDialog"
import hljs from "highlight.js"
import "../../node_modules/highlight.js/styles/github-dark.min.css"
import { Markdown } from "../markdown"
import { getModelLanguage } from "@/actions/modelLanguage"

export const ChatCollection = ({ chatHistory, status, lang }) => {
  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      {chatHistory && chatHistory.length <= 1 && (
        <div className="h-[60vh] w-full flex-col items-start pl-6 flex justify-center text-xl font-bold  text-center">
          {/* <p className="">
            Upload any PDF or Image and ask what's on your mind ?
          </p> */}
          <h1 className="text-2xl sm:text-4xl text-green-300 bg-clip-text bg-gradient-to-r  from-white via-[#dd6aba] to-blue-400 text-transparent">
            {lang === "hi" ? "नमस्ते," : "Hi there,"}
          </h1>
          <p
            className="py-4 text-start text-4xl sm:text-5xl bg-clip-text bg-gradient-to-r  from-purple-500 via-foreground to-blue-400 text-transparent animate-color-change
          "
          >
            {lang === "hi" ? (
              <span className="space-y-2 flex flex-col">
                <span>
                  मैं रूपा हूँ - आपकी निजी <br />
                </span>
                <span className="">सहायक </span>
              </span>
            ) : (
              "  I'm RooPa - Your Personal Assistant"
            )}
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
                      className="prose prose-code:overflow-x-auto prose-pre:overflow-x-auto prose-code:!whitespace-pre-wrap prose-code:max-w-full prose-pre:bg-[#1a1a30] prose-text-white  prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full prose-p:text-white prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(chat.content || "")),
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              chat.role == "assistant" && (
                <div className="flex gap-1 items-start max-w-3xl">
                  <div className="h-8 w-8 flex-shrink-0 my-1.5 bg-gradient-to-tr  from-purple-700 via-green-700  to-blue-700 flex justify-center items-center rounded-xl filter-blur-lg">
                    <Sparkles className={`${status ? "animate-pulse" : ""} size-4`} />
                  </div>

                  <div className=" py-2.5 px-2 rounded-xl w-full">
                    {/* <div
                      className="prose prose-code:overflow-x-auto prose-pre:overflow-x-auto prose-code:!whitespace-pre-wrap prose-code:max-w-full prose-pre:bg-muted-foreground/10 prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
                      style={{ width: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(chat.content || "")),
                      }}
                    /> */}
                    <Markdown>{chat.content}</Markdown>
                  </div>
                </div>
              )
            )}
          </div>
        ))}
    </div>
  )
}
