"use client"

import { useLLMInitialiseSession, useLLMSettingTemperature, useLLMSettingTopK, useResetLLMSetting, useUpdateLLMSetting } from "@/app/usellm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    temperature: z.string(),
    topK: z.string(),
});

export const Settings = () => {
    const [show, setShow] = useState<boolean>(false); // show settings?

    const temperature = useLLMSettingTemperature();
    const topK = useLLMSettingTopK();
    const updateSettings = useUpdateLLMSetting();
    const resetSettings = useResetLLMSetting();
    const initialiseNewSession = useLLMInitialiseSession();

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            temperature: temperature?.toString() ?? "",
            topK: topK?.toString() ?? ""
        },
    })

    const handleSubmit = form.handleSubmit(async (data) => {
        const newSettings = updateSettings({
            temperature: parseFloat(data.temperature),
            topK: parseInt(data.topK),
        });
        await initialiseNewSession(newSettings);
        setShow(false);
    })

    useEffect(() => {
        if (temperature === undefined || topK === undefined) {
            resetSettings();
        }
    }, [temperature, topK]);

    if (!show) {
        return (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <button onClick={() => setShow(true)}>Show settings</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="fixed bottom-12 sm:bottom-24 left-1/2 transform -translate-x-1/2 text-center overflow-y-auto bg-white p-4 rounded-lg shadow-lg z-50">
            <div className="mb-4">
                <p className="mb-2">Temperature</p>
                <input
                    className="border-gray-300 rounded-md border w-48"
                    {...form.register("temperature")}
                />
            </div>

            <div className="mb-4">
                <p className="mb-2">topK</p>
                <input
                    className="border-gray-300 rounded-md border w-48"
                    {...form.register("topK")}
                />
            </div>

            <div className="flex justify-center mb-4 space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Apply
                </button>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={async () => {
                        const newSettings = await resetSettings();
                        await initialiseNewSession(newSettings);
                        setShow(false);
                        form.setValue("temperature", newSettings.temperature.toString());
                        form.setValue("topK", newSettings.topK.toString());
                    }}
                >
                    Reset
                </button>
            </div>
        </form>
    );
};