'use client'
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
    const [genMod, setgemmod] = React.useState(null)

    React.useEffect(() => {
        if (model) {
            setgemmod(model)
        }
    }, [model])

    const defaultValue = genMod ? genMod : geminiModels[0].model;
    return (
        <Select onValueChange={(e) => switchModel(e)} defaultValue={defaultValue}>
            <SelectTrigger className="w-[180px] rounded-3xl">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent className=" rounded-3xl ">
                <SelectGroup>
                    <SelectLabel>Available gemini models</SelectLabel>
                    {geminiModels.map((mod) => (
                        <SelectItem value={mod.model}>{mod.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
