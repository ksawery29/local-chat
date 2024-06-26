"use client";

import ChatContainer from "@/components/chat/chat-container";
import Input from "@/components/chat/input";
import NotSupported from "@/components/not-supported";
import { useEffect, useState } from "react";

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

    if (!supports) {
        return <NotSupported />;
    }

    return (
        <ChatContainer>
            <Input />
        </ChatContainer>
    );
}
