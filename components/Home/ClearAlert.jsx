import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ReloadIcon } from "@radix-ui/react-icons"

export function ClearAlert({ clearChat }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild >
                                <button className="hidden sm:flex rounded-full p-2 hover:bg-muted bg-muted">
                                    <ReloadIcon />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Clear</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        chat and remove your data from history.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearChat} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}
