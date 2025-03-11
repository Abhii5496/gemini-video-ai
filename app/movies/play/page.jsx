"use client";
import React from "react";
import VideoJS from "../videojs";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const playerRef = React.useRef(null);
  // const searchParams = new URLSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get("url");

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    // responsive: true,
    // fluid: true,
    sources: [
      {
        src: url,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("error", () => {
      console.log("player error occurred");
      // Navigate back when there's an error
      router.back();
    });
  };

  if (!url) return <div>No URL provided</div>;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full flex justify-start pl-8 pb-4">
        <Button onClick={() => router.push("/movies")}>Back</Button>
      </div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}
