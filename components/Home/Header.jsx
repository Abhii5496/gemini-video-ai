import React from "react";
import { ClearAlert } from "./ClearAlert";
import { SelectModel } from "../gemini-model";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

export default function Header({ setMessages, isLoading }) {
  return (
    <header className="flex h-18 sticky top-0 bg-background md:h-12 items-center px-2 md:px-2 gap-2 z-40">
      <div className="flex items-center justify-between gap-2 sm:px-4 w-full h-full ">
        <p className="text-lg font-bold text-sidebar-primary-foreground py-3 italic">
          Roopa ai{" "}
        </p>
        <div className="flex items-center justify-center">
          <ClearAlert clearChat={() => setMessages([])} status={isLoading}>
            <div className="flex justify-center items-end ">
              <Button
                variant="ghost"
                className="bg-muted/40 px-1.5"
                disabled={isLoading}
              >
                <PlusIcon />
                <span className="hidden sm:flex">New Chat</span>
              </Button>
            </div>
          </ClearAlert>
        </div>
      </div>
    </header>
  );
}
