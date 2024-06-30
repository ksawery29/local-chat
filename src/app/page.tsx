"use client";

import BottomIcons from "@/components/bottom-icons";
import ChatBox from "@/components/chat/chat-box";
import ChatContainer from "@/components/chat/chat-container";
import Input from "@/components/chat/input";
import Header from "@/components/header";
import NotSupported from "@/components/not-supported";
import Settings from "@/components/settings";
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
            // get settings
            const data = JSON.parse(
                localStorage.getItem("settings") ?? "{}"
            ) as {
                temperature: number;
                topK: number;
            };

            let settings = {};
            if (Object.keys(data).length != 0) {
                if (!data.temperature || !data.topK) {
                    toast.error("temperature or topP cannot be empty");
                } else {
                    settings = data;
                }
            }

            if (supports === true && session === undefined) {
                setSession(await window.ai.createTextSession(settings));
            }
        })();
    }, [supports]);

    const [inputValue, setInputValue] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    // check if message is sending
    const [sending, setSending] = useState<boolean>(false);

    if (!supports) {
        return <NotSupported />;
    }

    return (
        <>
            <Header />
            <Settings />
            <ChatContainer>
                <ChatBox messages={messages} />

                <Input
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                    sending={sending}
                    send={async () => {
                        if (inputValue.length === 0) {
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
                                    content: inputValue,
                                },
                            ];
                        });

                        const message = inputValue;
                        setSending(true);

                        // clear input value
                        setInputValue("");

                        // append messages
                        const predicted = await session.prompt(message);

                        setMessages((old) => {
                            return [
                                ...old,
                                { author: "ai", content: predicted },
                            ];
                        });
                        setSending(false);
                    }}
                />

                <Toaster />
            </ChatContainer>

            <BottomIcons />
        </>
    );
}
