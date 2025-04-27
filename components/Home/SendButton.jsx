import { getMegaFile, uploadToMega } from "@/app/actions/megaActions"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { listAllFiles, uploadToGemini } from "@/utils/actions"
import { PlusCircle, Send } from "lucide-react"

export function SendButton({ handleSubmit, uploadStatus }) {
  const getlist = async () => {
    const list = await listAllFiles()
    console.log(list)
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={uploadStatus == "uploading"}
            variant="secondary"
            className="rounded-full px-5 hover:bg-muted-foreground/20 bg-foreground hover:text-foreground text-background border border-muted-foreground/20"
            onClick={handleSubmit}
          >
            <Send />
          </Button>
        </TooltipTrigger>
        {/* <TooltipContent className="bg-opacity-40">
          <p>Enter to send</p>
        </TooltipContent> */}
      </Tooltip>
    </TooltipProvider>
  )
}
