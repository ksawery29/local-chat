const ChatContainer: React.FC<React.PropsWithChildren> = ({
    children,
}): React.JSX.Element => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-50 rounded-2xl border-dotted border-2 border-black p-4 w-1/2 min-w-72 h-1/2 min-h-80">
                {children}
            </div>
        </div>
    );
};

export default ChatContainer;
