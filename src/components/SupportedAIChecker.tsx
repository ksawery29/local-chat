"use client"

import { type PropsWithChildren, useState, useEffect } from "react";
import { LoaderIcon } from "lucide-react"
import Link from "next/link";

export const SupportedAIChecker = (props: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [supported, setSupported] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!window.ai) {
      setSupported(false);
      setLoading(false);
      return;
    }

    (async () => {
      if (!window.ai) {
        return;
      }

      const supported = await window.ai.canCreateTextSession()

      if (supported !== "readily") {
        setSupported(false);
        setLoading(false);
      } else {
        setSupported(true);
        setLoading(false);
      }
    })();
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-36 border-b-8 border-blue-500">
          <p className="font-semibold text-lg">Checking if your browser supports <code>window.ai</code> <LoaderIcon className="size-4 animate-spin" /></p>
        </div>
      </div>
    );
  }

  if (supported) {
    return props.children
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-36 border-b-8 border-red-500">
        <p className="font-semibold text-lg">
          Your browser doesn't support <code>window.ai</code>
        </p>

        {/* error */}
        <pre>
          <Link href="https://github.com/ksawery29/local-chat#instructions">
            Press here for instructions
          </Link>
        </pre>
      </div>
    </div>
  );
};