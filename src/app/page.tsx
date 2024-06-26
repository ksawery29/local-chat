"use client";

import NotSupported from "@/components/not-supported";
import { useEffect, useState } from "react";

export default function Home() {
    // check if browser supports window.ai
    if (typeof window.ai === "undefined") {
        return <NotSupported />;
    }

    const [supports, setSupports] = useState<boolean>(true);
    useEffect(() => {
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
        <main>
            <p>hello world</p>
        </main>
    );
}
