import ReactMarkdown from "react-markdown";

type MarkdownDisplayProps = {
  text: string;
};

export const MarkdownDisplay = (props: MarkdownDisplayProps) => {
  return (
    <ReactMarkdown
      children={props.text}
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-2xl" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-xl" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-lg" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-base" {...props} />,
        p: ({ node, ...props }) => <p className="text-base mb-4" {...props} />,
        a: ({ node, ...props }) => <a className="underline text-blue-400" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal" {...props} />,
        li: ({ node, ...props }) => <li className="ml-8 text-base" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="mx-auto" {...props} />,
        pre: ({ node, ...props }) => <pre className="text-sm" {...props} />,
        code: ({ node, ...props }) => <code className="text-sm" {...props} />,
        hr: ({ node, ...props }) => <hr className="border-gray-300" {...props} />,
        table: ({ node, ...props }) => <table className="table-auto" {...props} />,
        thead: ({ node, ...props }) => <thead className="border-b" {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr {...props} />,
        td: ({ node, ...props }) => <td className="border" {...props} />,
        th: ({ node, ...props }) => <th className="border" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
        del: ({ node, ...props }) => <del className="line-through" {...props} />,
        img: ({ node, ...props }) => <img className="max-w-full max-h-[300px] mx-auto" {...props} alt={props.alt} />,
        iframe: () => <span>[iframe]</span>,
        script: () => <span>[script]</span>,
      }}
    />
  );
};
