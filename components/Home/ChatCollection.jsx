import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import DOMPurify from "dompurify";
import { FileVideoIcon } from "lucide-react";
import { marked } from "marked";
import React, { Fragment, useEffect, useRef } from "react";

export const ChatCollection = ({ chatHistory, status }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);
  // console.log(chatHistory);
  return (
    <div className="w-full flex flex-col gap-2">
      {chatHistory && chatHistory.length <= 0 && (
        <div className="h-full w-full items-center flex justify-center text-xl font-medium font-mono">
          Hello !! What's on your mind ? Fire up 🚀🚀
        </div>
      )}
      {chatHistory &&
        chatHistory.length > 0 &&
        chatHistory.map((chat, i) => (
          <div key={i} className="py-2">
            {chat.role == "user" ? (
              <div className="flex gap-2 items-center justify-end flex-row-reverse">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="w-full flex justify-end">
                  <div className="bg-muted/70 hover:bg-muted/50 py-2.5 px-2 rounded-xl w-fit">
                    <div
                      className="prose prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
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
              <div className="flex gap-2 items-start">
                <Avatar className="h-8 w-8 my-1.5">
                  <AvatarImage src="" />
                  <AvatarFallback>Ai</AvatarFallback>
                </Avatar>

                <div className=" py-2.5 px-2 rounded-xl ">
                  <div
                    className="prose prose-strong:text-neutral-300 prose-headings:text-neutral-300 text-neutral-300 text-sm prose:w-full w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(chat.content || "")
                      ),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

      <div ref={messagesEndRef} />
    </div>
  );
};
