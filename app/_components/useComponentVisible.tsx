import { useRef, useState, useEffect } from "react";

export default function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsComponentVisible(false);
        }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsComponentVisible(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        document.addEventListener("keydown", handleKeyPress, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
            document.removeEventListener("keydown", handleKeyPress, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible }
}
