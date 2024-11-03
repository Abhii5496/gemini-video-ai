import React from "react";
import { ClearAlert } from "./ClearAlert";

export default function Header({ setMessages, isLoading }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 sticky top-0 left-0 w-full bg-background z-[99999]">
      <div className="flex items-center justify-between gap-2 px-4 w-full border-b pb-3">
        <p className="text-sm text-sidebar-primary-foreground">
          Start your journey with G-Alpha
        </p>
        <div className="flex sm:hidden">
          <ClearAlert clearChat={() => setMessages([])} status={isLoading} />
        </div>
      </div>
    </header>
  );
}
