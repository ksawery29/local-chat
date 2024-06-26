const NotSupported = (): React.JSX.Element => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-36 border-b-8 border-red-500">
        <p className="font-semibold text-lg">
          Your browser doesnt support <code>window.ai</code>
        </p>

        {/* error */}
        <pre>
          <a href="https://github.com/ksawery29/local-chat#instructions">
            Press here for instructions
          </a>
        </pre>
      </div>
    </div>
  );
};

export default NotSupported;
