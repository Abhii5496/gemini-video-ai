import { getMegaFile, uploadToMega } from "@/app/actions/megaActions";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { listAllFiles, uploadToGemini } from "@/src/utils/actions";
import { PlusCircle } from "lucide-react";

export function SendButton({ handleSubmit, uploadStatus }) {
  const getlist = async () => {
    const list = await listAllFiles();
    console.log(list);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
