import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Input: React.FC<{
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    inputValue: string;
    send: () => Promise<void>;
}> = ({ setInputValue, send, inputValue }): React.JSX.Element => {
    return (
        <div className="w-[100%] flex items-center">
            <input
                type="text"
                className="border w-[95%] border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message"
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
            />

            <button onClick={send}>
                <FontAwesomeIcon
                    className="ml-5"
                    icon={faPaperPlane}
                    color="black"
                    size="xl"
                />
            </button>
        </div>
    );
};

export default Input;
