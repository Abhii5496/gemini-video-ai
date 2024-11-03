import clsx from "clsx";
import React from "react";

export default function Loading({ className }) {
  return (
    <div
      className={clsx(
        "h-10 flex justify-center items-center gap-1 bg-muted/80 px-4 py-0 rounded-full",
        className
      )}
    >
      <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-0 duration-500 bg-white rounded-full"></div>
      <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-75 duration-500 bg-white rounded-full"></div>
      <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-150 duration-500 bg-white rounded-full"></div>
      <div class="w-1 h-2 animate-in fade-in animate-pulse repeat-infinite ease-in-out delay-200 duration-500 bg-white rounded-full"></div>
    </div>
  );
}
