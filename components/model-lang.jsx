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
import { geminiModels, initialText } from "@/lib/helper";
import usechatStore from "@/lib/store";

export function ModelLang({ isLoading, messages, setMessages }) {
  const { lang, switchLang } = usechatStore((state) => state);

  const currentVal = lang || 1;
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(currentVal);

  const handleLangChange = (lang) => {
    setSelectedLang(lang);
    setIsAlertOpen(true);
  };

  const confirmLangChange = () => {
    setMessages((prev) => [
      ...prev,
      { id: 1, role: "system", content: initialText },
    ]);
    switchLang(selectedLang);
    setIsAlertOpen(false);
  };

  console.log(currentVal, selectedLang);
  return (
    <>
      <Select
        onValueChange={handleLangChange}
        value={currentVal}
        disabled={isLoading}
      >
        <SelectTrigger className="px-2 w-fit bg-accent/50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground md:h-8 [&>svg]:!size-5 md:[&>svg]:!size-4 border-none hover:bg-accent focus:border-none focus-visible:border-none">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            <SelectItem value={1}> Hindi</SelectItem>
            <SelectItem value={2}> English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="max-w-sm sm:max-w-lg rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Change Language</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the language? This action will
              clear your current chat history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLangChange}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
