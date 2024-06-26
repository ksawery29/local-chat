interface Window {
    ai?: {
        canCreateTextSession: () => Promise<"readily" | "not-readily">;
        createTextSession: (settings?: {
            temperature: number;
            topK: number;
        }) => Promise<{
            prompt: (message: string) => Promise<string>;
            promptStreaming: (message: string) => {
                getReader: () => {
                    read: () => Promise<{
                        done: boolean;
                        value: string;
                    }>;
                }
            }
        }>
        defaultTextSessionOptions: () => Promise<{
            temperature: number;
            topK: number;
        }>;
    };
}
