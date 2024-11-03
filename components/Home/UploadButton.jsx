import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";

export function UploadButton({ handleFileChange }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="h-full flex justify-center items-center p-1.5 hover:bg-accent hover:text-accent-foreground rounded-full">
            <input
              type="file"
              id="video"
              // accept="video/*"
              accept="image/png ,image/jpeg,image/webp,image/heic,image/heif,application/pdf, video/*"
              hidden
              onChange={handleFileChange}
              //   ref={inputRef}
            />
            <label
              htmlFor="video"
              className="h-full flex justify-center items-center cursor-pointer"
            >
              <PlusCircle />
            </label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to upload video</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
