"use client";

import ChatBox from "@/components/chat/chat-box";
import ChatContainer from "@/components/chat/chat-container";
import Input from "@/components/chat/input";
import NotSupported from "@/components/not-supported";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface Message {
    author: "user" | "ai";
    content: string;
}
export default function Home() {
    const [supports, setSupports] = useState<boolean>(true);
    useEffect(() => {
        // check if browser supports window.ai
        if (typeof window.ai === "undefined") {
            setSupports(false);
        }

        (async () => {
            if ((await window.ai.canCreateTextSession()) !== "readily") {
                setSupports(false);
            }
        })();
    }, []);

    const [session, setSession] = useState<any>();
    useEffect(() => {
        (async () => {
            if (supports === true && session === undefined) {
                setSession(await window.ai.createTextSession());
            }
        })();
    }, [supports]);

    const inputValue = useRef<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    if (!supports) {
        return <NotSupported />;
    }

    return (
        <ChatContainer>
            <ChatBox messages={messages} />

            <Input
                message={inputValue}
                send={async () => {
                    if (inputValue.current.length === 0) {
                        // message cannot be empty
                        toast.error("Message cannot be empty");
                        return;
                    }

                    // add message sent by user
                    setMessages((old) => {
                        return [
                            ...old,
                            {
                                author: "user",
                                content: inputValue.current,
                            },
                        ];
                    });

                    // append messages
                    const predicted = await session.prompt(inputValue.current);
                    setMessages((old) => {
                        return [...old, { author: "ai", content: predicted }];
                    });
                }}
            />

            <Toaster />
        </ChatContainer>
    );
}
