import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomIcons = () => {
    return (
        /* center at the bottom center */
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <button
                onClick={() =>
                    (window.location.href = "https://github.com/ksawery29/")
                }
            >
                <FontAwesomeIcon
                    className="transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-50"
                    icon={faGithub}
                    color="black"
                    size="3x"
                />
            </button>
        </div>
    );
};

export default BottomIcons;
