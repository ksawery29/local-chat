import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import lazy from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "sonner";
import Header from "@/components/header";
import BottomIcons from "@/components/bottom-icons";

const SupportedAIChecker = lazy(() => import("@/components/SupportedAIChecker").then(mod => mod.SupportedAIChecker), { ssr: false });
const Settings = lazy(() => import("@/components/settings").then(mod => mod.Settings), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "On Device, In Browser, LLM",
    description: "Chat with gemini locally",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <Suspense>
                    <SupportedAIChecker>
                        {children}
                    </SupportedAIChecker>
                    <Settings />
                </Suspense>
                <BottomIcons />
                <Toaster />
            </body>
        </html>
    );
}
