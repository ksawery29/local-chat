import lazy from "next/dynamic";
import { Suspense } from "react";

const LLMSession = lazy(() => import("@/components/chat/Session").then(mod => mod.LLMSession), { ssr: false });
const ChatBox = lazy(() => import("@/components/chat/chat-box").then(mod => mod.ChatBox), { ssr: false });
const ChatInput = lazy(() => import("@/components/chat/input").then(mod => mod.ChatInput), { ssr: false });

export default function HomePage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="rounded-2xl border-dotted border-2 border-black p-4 w-[80svw] min-w-72 h-[70svh] min-h-80">
                <Suspense>
                    <LLMSession>
                        <ChatBox />
                        <ChatInput />
                    </LLMSession>
                </Suspense>
            </div>
        </div>
    );
}
