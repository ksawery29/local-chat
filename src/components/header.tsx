export default function Header(): React.JSX.Element {
    return (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 text-center w-full md:w-2/3 lg:w-1/2 xl:w-1/2">
            <h1 className="font-bold text-3xl">Local Chat</h1>
            <p className="mt-3 text-lg">
                A demo using <code>window.ai</code> to chat with Gemini locally
            </p>
        </div>
    );
}
