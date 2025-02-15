import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paperclip, PlusCircle } from "lucide-react";

export function UploadButton({
  handleFileChange,
  fileInputRef,
  setFiles,
  isLoading,
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`h-full flex justify-center items-center p-1.5 hover:bg-muted-foreground/20 bg-foreground hover:text-foreground text-background rounded-full ${
              isLoading ? "opacity-30" : "opacity-100"
            }`}
          >
            <input
              type="file"
              id="file"
              disabled={isLoading}
              // accept="video/*"
              accept="image/png ,image/jpeg,image/webp,image/heic,image/heif,application/pdf"
              hidden
              onChange={(event) => {
                console.log(event.target.files);
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              ref={fileInputRef}
            />
            <label
              htmlFor="file"
              className="h-full flex justify-center items-center cursor-pointer p-0.5"
            >
              <Paperclip className="w-4 h-4" />
            </label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to upload files</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
