import { useEffect, useState } from "react";

type ScreenSize = "sm" | "md" | "lg";

export function useScreenSize(): ScreenSize {
    const [size, setSize] = useState<ScreenSize>("lg");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setSize("sm");
            else if (width < 1024) setSize("md");
            else setSize("lg");
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}
