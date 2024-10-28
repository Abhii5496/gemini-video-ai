import clsx from "clsx";
import DOMPurify from "dompurify";
import { FileVideoIcon } from "lucide-react";
import { marked } from "marked";
import React, { Fragment, useEffect, useRef } from "react";

export const ChatCollection = ({ chatHistory, status }) => {
  const prose =
    "prose prose-strong:text-neutral-300 text-neutral-300 text-sm prose:w-full w-full prose-code:text-neutral-300 prose-pre:text-pretty prose-a:text-blue-500";
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);
  // console.log(chatHistory)
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
          <Fragment key={i}>
            {chat.role == "user" ? (
              <div className="w-full flex justify-end">
                <div className="bg-muted/25 hover:bg-muted/40 py-2.5 px-2 rounded-xl w-fit">
                  <p
                    className={`text-sm font-medium  p-1 rounded-lg mb-2 w-fit ${
                      chat.role == "user" ? "bg-green-800" : "bg-blue-800"
                    }`}
                  >
                    {chat.role}
                  </p>
                  <div
                    className={clsx(prose)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(chat.parts[0].text || "")
                      ),
                    }}
                  />

                  {chat.parts[0]?.fileData && (
                    <p className="text-sm bg-green-500 rounded-xl flex items-center gap-1 p-1">
                      {" "}
                      <FileVideoIcon size={16} />
                      video uploaded here.
                    </p>
                  )}
                  {/* {chat.parts[0]?.fileData && <video src={chat.parts[0]?.fileData.fileUri} className='aspect-video h-40' />} */}
                </div>
              </div>
            ) : (
              <div className="bg-muted/25 hover:bg-muted/40 py-2.5 px-2 rounded-xl w-fit">
                <p
                  className={`text-sm font-medium  p-1 rounded-lg mb-2 w-fit ${
                    chat.role == "user" ? "bg-green-800" : "bg-blue-800"
                  }`}
                >
                  {chat.role}
                </p>
                <div
                  className={clsx(prose)}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      marked.parse(chat.parts[0].text || "")
                    ),
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      {status && (
        <div className="w-fit h-fit flex flex-col bg-muted/25 hover:bg-muted/40 py-2.5 px-2 rounded-xl ">
          <p
            className={`text-sm font-medium  p-1 rounded-lg mb-2 w-fit bg-blue-800`}
          >
            model
          </p>
          <div className="h-8 flex justify-center items-center gap-1 bg-muted/80 px-4 py-0 rounded-xl">
            <div class="w-1 h-3 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-0 duration-500 bg-white rounded-full"></div>
            <div class="w-1 h-3 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-75 duration-500 bg-white rounded-full"></div>
            <div class="w-1 h-3 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-150 duration-500 bg-white rounded-full"></div>
            <div class="w-1 h-3 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-200 duration-500 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
