import { Message } from "@/app/page";
import { useEffect } from "react";

const UserMessage: React.FC<{ content: string }> = ({
    content,
}): React.JSX.Element => {
    return (
        <div className="flex justify-end br-5 items-center">
            <div className="bg-gray-200 text-center rounded-lg p-2 mr-5 mb-5">
                <p>{content}</p>
            </div>
        </div>
    );
};

const AIMessage: React.FC<{ content: string }> = ({
    content,
}): React.JSX.Element => {
    return (
        <div className="flex justify-start br-5 items-center">
            <div className="bg-blue-500 max-w-96 text-center rounded-lg p-2 ml-5 mb-5">
                <p className="text-white">{content}</p>
            </div>
        </div>
    );
};

const ChatBox: React.FC<{ messages: Message[] }> = ({
    messages,
}): React.JSX.Element => {
    return (
        <div className="w-[100%] h-[90%] overflow-auto">
            {messages &&
                messages.map((data, index) =>
                    data.author === "user" ? (
                        <UserMessage
                            key={index}
                            content={data.content}
                        ></UserMessage>
                    ) : (
                        <AIMessage
                            key={index}
                            content={data.content}
                        ></AIMessage> // Example for other authors
                    )
                )}
        </div>
    );
};

export default ChatBox;
