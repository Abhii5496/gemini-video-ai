import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";

export function SendButton({ handleSubmit, uploadStatus }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild >
          <Button
            disabled={uploadStatus == "uploading"}
            variant="secondary"
            className="rounded-full px-5 hover:bg-foreground hover:text-secondary"
            onClick={handleSubmit}
          >
            Run
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-opacity-40">
          <p>ctrl + Enter to send</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
