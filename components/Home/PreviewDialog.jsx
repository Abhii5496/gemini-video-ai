import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileIcon } from "lucide-react";

export default function PreviewDialog({ url, name, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const renderPreview = () => {
    if (type.startsWith("image/")) {
      return (
        <img
          src={url}
          alt={name}
          className="max-w-full max-h-[60vh] object-contain"
        />
      );
    } else if (type.startsWith("video/")) {
      return (
        <video controls className="max-w-full max-h-[60vh]">
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (type === "application/pdf") {
      return (
        <iframe src={url} className="w-full h-[60vh]" title={name}>
          This browser does not support PDFs. Please download the PDF to view
          it.
        </iframe>
      );
    } else {
      return (
        <div className="text-center p-4">Unsupported file type: {type}</div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center items-center gap-2 bg-muted-foreground/10 hover:bg-muted-foreground/20 cursor-pointer overflow-hidden aspect-video h-[200px] w-full rounded-lg">
         {renderPreview()}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Previewing content of type: {type}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderPreview()}</div>
        <DialogFooter>
          <Button type="button" onClick={() => setIsOpen(false)}>
            Close Preview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
