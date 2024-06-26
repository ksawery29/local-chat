import { GithubIcon } from "lucide-react";
import Link from "next/link";

const BottomIcons = () => {
    return (
        /* center at the bottom center */
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <Link href="https://github.com/ksawery29/"
            >
                <GithubIcon
                    className="transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-50 text-black"
                />
            </Link>
        </div>
    );
};

export default BottomIcons;
