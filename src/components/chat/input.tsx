"use client"

import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLLMAddMessage, useLLMGeneratingResponse } from "@/app/usellm";

const schema = z.object({
    message: z.string(),
})

export const ChatInput = () => {

    const generating = useLLMGeneratingResponse();
    const addMessage = useLLMAddMessage();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            message: "",
        }
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        form.reset();
        await addMessage(data.message);
    })

    return (
        <form onSubmit={handleSubmit} className="w-[100%] flex items-center gap-2">
            <Input
                type="text"
                className="border w-[95%] border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                {...form.register("message")}
            />

            <Button disabled={generating} type="submit" variant="secondary" size="icon">
                <SendIcon data-loading={generating} className="opacity-100 data-[loading=true]:opacity-50 transition-opacity duration-300 ease-in-out text-black"
                />
            </Button>
        </form>
    );
};

export default Input;
