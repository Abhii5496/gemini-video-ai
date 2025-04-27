"use client"
import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect } from "react"
import { setModelLanguage } from "@/actions/modelLanguage"
import { initialHindiText } from "@/lib/helper"
import { ClearAlert } from "./Home/ClearAlert"
import { PlusIcon } from "lucide-react"

const LANGUAGES = [
  { label: "Hindi", value: "hi" },
  { label: "English", value: "en" },
]

export default function LangSelector({ disabled = false, messages, setMessages, lang, setLang }) {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [pendingLang, setPendingLang] = useState(null)

  const confirmLanguageChange = (value) => {
    if (messages.length > 1) {
      setPendingLang(value)
      setOpenConfirm(true) // Open modal only if there are more than 1 message
    } else {
      // Directly change without confirmation
      changeLanguage(value)
    }
  }

  const changeLanguage = (value) => {
    setLang(value)
    setModelLanguage(value)

    if (value === "hi") {
      setMessages([
        {
          id: new Date().getTime(),
          role: "system",
          content: initialHindiText,
        },
      ])
    } else {
      setMessages([
        {
          id: new Date().getTime(),
          role: "system",
          content: "You are a helpful assistant. generate response in english.",
        },
      ])
    }
  }

  const handleConfirm = () => {
    if (!pendingLang) return
    changeLanguage(pendingLang)
    setPendingLang(null)
    setOpenConfirm(false)
  }

  const handleCancel = () => {
    setPendingLang(null)
    setOpenConfirm(false)
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={disabled} className="focus-visible:ring-0">
          <Button className="px-3 py-2 rounded-md bg-accent/50 hover:bg-accent text-xs font-medium border border-muted-foreground/20">
            {LANGUAGES.find((l) => l.value === lang)?.label || "Select Language"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuRadioGroup value={lang} onValueChange={confirmLanguageChange}>
            {LANGUAGES.map((l) => (
              <DropdownMenuRadioItem key={l.value} value={l.value} className="cursor-pointer">
                {l.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirm Dialog */}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Language Change</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Changing the language will clear your current chat history. Are you sure you want to
            continue?
          </p>
          <DialogFooter className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-destructive text-white" onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ClearAlert clearChat={() => setMessages([])} status={disabled}>
        New Chat
      </ClearAlert>
    </div>
  )
}
