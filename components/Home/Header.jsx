import React from "react"
import { ClearAlert } from "./ClearAlert"
import { SelectModel } from "../gemini-model"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"

export default function Header({ setMessages, isLoading, messages }) {
  return (
    <header className="flex h-18 sm:h-24 sticky top-0 bg-muted-foreground/10 backdrop-blur-2xl md:h-12 items-center px-2 md:px-2 gap-2 z-40 ">
      <div className="flex items-center justify-between gap-2 sm:px-4 w-full h-full ">
        <p className="text-lg font-bold  py-3 bg-clip-text bg-gradient-to-r  from-white via-[#dd6aba] to-blue-400 text-transparent">
          RooPa
        </p>
        <div className="flex items-center gap-3">
          {/* <ModelLang
            isLoading={isLoading}
            setMessages={setMessages}
            messages={messages}
          /> */}
          {messages?.length > 0 && (
            <ClearAlert clearChat={() => setMessages([])} status={isLoading}>
              <div className="flex justify-center items-end ">
                <Button
                  variant="ghost"
                  className="bg-background hover:bg-background/70 px-2 text-xs gap-1 rounded-[5px]"
                  disabled={isLoading}
                >
                  <PlusIcon />
                  <span className="hidden sm:flex">New Chat</span>
                </Button>
              </div>
            </ClearAlert>
          )}
        </div>
      </div>
    </header>
  )
}
