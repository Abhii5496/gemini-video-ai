"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { geminiModels } from "@/lib/helper";
import usechatStore from "@/lib/store";
import { ClearAlert } from "./Home/ClearAlert";

export function SelectModel({ isLoading, clearChat }) {
  const { model, switchModel } = usechatStore((state) => state);

  const currentVal = model || geminiModels[0].model;
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(currentVal);

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
    setIsAlertOpen(true);
  };

  const confirmModelChange = () => {
    switchModel(selectedModel);
    setIsAlertOpen(false);
    clearChat();
  };

  // console.log(currentVal);
  return (
    <>
      <Select
        onValueChange={handleModelChange}
        value={currentVal}
        disabled={isLoading}
      >
        <SelectTrigger className="px-2 w-fit bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground md:h-8 [&>svg]:!size-5 md:[&>svg]:!size-4 border-none hover:bg-accent focus:border-none focus-visible:border-none">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {geminiModels.map((mod, i) => (
              <SelectItem key={i} value={mod.model}>
                {mod.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Model</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the model? This action will clear
              your current chat history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmModelChange}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
