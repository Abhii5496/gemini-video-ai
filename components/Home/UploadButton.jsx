import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, PlusCircle } from "lucide-react";

export function UploadButton({ handleFileChange, fileInputRef, setFiles }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="h-full flex justify-center items-center p-1.5 bg-accent/60 hover:bg-accent hover:text-accent-foreground rounded-full">
            <input
              type="file"
              id="video"
              // accept="video/*"
              accept="image/png ,image/jpeg,image/webp,image/heic,image/heif,application/pdf"
              hidden
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              ref={fileInputRef}
            />
            <label
              htmlFor="video"
              className="h-full flex justify-center items-center cursor-pointer p-1"
            >
              <Paperclip className="w-4 h-4" />
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
