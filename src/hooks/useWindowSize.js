import { useEffect, useState } from "react";

function useWindowSize() {
    const isClient = typeof window === "object";

    const [windowWidth, setWindowWidth] = useState(() =>
        isClient ? window.innerWidth : null
    );

    useEffect(() => {
        if (!isClient) return;

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return windowWidth;
}

export default useWindowSize;
