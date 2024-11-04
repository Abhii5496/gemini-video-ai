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
import { geminiModels } from "@/lib/helper";
import usechatStore from "@/lib/store";

export function SelectModel() {
  const { model, switchModel } = usechatStore((state) => state);

  const defaultValue = model ?? geminiModels[0].name;
  return (
    <Select onValueChange={(e) => switchModel(e)} defaultValue={defaultValue}>
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
  );
}
