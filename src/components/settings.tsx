import { ChangeEvent, useEffect, useState } from "react";

const Input: React.FC<{
    value: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }): React.JSX.Element => {
    return (
        <input
            type="number"
            className="border-gray-300 rounded-md border w-48"
            value={value}
            onChange={onChange}
        ></input>
    );
};

const Settings = (): React.JSX.Element => {
    const [temperature, setTemperature] = useState<number>(0);
    const [topK, setTopK] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false); // show settings?

    useEffect(() => {
        (async () => {
            const data = localStorage.getItem("settings");
            // set default values
            if (data == null) {
                const defaultData = await window.ai.defaultTextSessionOptions();
                setTemperature(defaultData.temperature);
                setTopK(defaultData.topK);
            } else {
                // convert localstorage to object
                const toObject = JSON.parse(data) as {
                    topK: number;
                    temperature: number;
                };
                setTemperature(toObject.temperature);
                setTopK(toObject.topK);
            }
        })();
    }, []);

    if (!show) {
        return (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <button onClick={() => setShow(true)}>Show settings</button>
            </div>
        );
    }

    return (
        <div className="fixed bottom-12 sm:bottom-24 left-1/2 transform -translate-x-1/2 text-center overflow-y-auto bg-white p-4 rounded-lg shadow-lg z-50">
            <div className="mb-4">
                <p className="mb-2">Temperature</p>
                <Input
                    value={temperature}
                    onChange={(event) => {
                        setTemperature(parseFloat(event.target.value));
                        localStorage.setItem(
                            "settings",
                            JSON.stringify({
                                temperature: event.target.value,
                                topK,
                            })
                        );
                    }}
                />
            </div>

            <div className="mb-4">
                <p className="mb-2">topK</p>
                <Input
                    value={topK}
                    onChange={(event) => {
                        setTopK(parseFloat(event.target.value));
                        localStorage.setItem(
                            "settings",
                            JSON.stringify({
                                temperature,
                                topK: event.target.value,
                            })
                        );
                    }}
                />
            </div>

            <div className="flex justify-center mb-4 space-x-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => window.location.reload()}
                >
                    Apply
                </button>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                        localStorage.removeItem("settings");
                        window.location.reload();
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Settings;
