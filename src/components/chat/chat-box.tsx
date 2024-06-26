"use client"

import { useLLMMessages, useLLMStreamedResponse } from "@/app/usellm";
import { useEffect, useRef } from "react";

const UserMessage = (props: { content: string }) => {
    return (
        <div className="flex justify-end br-5 items-center">
            <div className="bg-gray-200 text-center rounded-lg p-2 mr-5 mb-5">
                <p>{props.content}</p>
            </div>
        </div>
    );
};

const AIMessage = (props: { content: string }) => {
    return (
        <div className="flex justify-start br-5 items-center">
            <div className="bg-blue-500 max-w-xl text-start rounded-lg p-2 ml-5 mb-5">
                <p className="text-white">{props.content}</p>
            </div>
        </div>
    );
};

export const ChatBox = () => {
    const ref = useRef<HTMLDivElement>(null);
    const messages = useLLMMessages();
    const latestResponse = useLLMStreamedResponse();

    const sortedMessages = messages.toSorted((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    useEffect(() => {
        // scroll down on new message
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [sortedMessages, latestResponse]);

    return (
        <div className="w-[100%] h-[90%] overflow-auto">
            {sortedMessages.map((data) =>
                data.author === "user" ? (
                    <UserMessage
                        key={data.id}
                        content={data.content}
                    ></UserMessage>
                ) : (
                    <AIMessage
                        key={data.id}
                        content={data.content}
                    ></AIMessage> // Example for other authors
                )
            )}
            {latestResponse && <AIMessage content={latestResponse} />}
            <div ref={ref} />
        </div>
    );
};
